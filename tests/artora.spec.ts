import { test, expect } from "@playwright/test";
import { artworks } from "../src/data/artworks";
import { artists } from "../src/data/artists";
import { courses } from "../src/data/courses";
import { masterpieces } from "../src/data/masterpieces";
import { historicalArtists } from "../src/data/historical-artists";
import { posts } from "../src/data/community-posts";
const routes = [
  "/",
  "/artworks",
  "/artists",
  "/commissions/new",
  "/community",
  "/community/create",
  "/community/groups",
  "/community/challenges",
  "/learn",
  "/learn/classroom",
  "/masters",
  "/cart",
  "/checkout",
  "/favorites",
  "/profile",
  "/about",
  ...artworks.map((a) => "/artworks/" + a.slug),
  ...artists.map((a) => "/artists/" + a.slug),
  ...courses.map((c) => "/learn/classes/" + c.slug),
  ...artists.filter((a) => a.teaching).map((a) => "/learn/tutors/" + a.slug),
  ...masterpieces.map((m) => "/masters/artworks/" + m.slug),
  ...historicalArtists.map((a) => "/masters/artists/" + a.slug),
  ...posts.map((p) => "/community/posts/" + p.slug),
];
test("every required route renders, all images resolve, and unknown entities show the not-found page", async ({
  page,
}) => {
  test.setTimeout(240000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (/hydrat|server rendered HTML/i.test(message.text())) {
      errors.push(message.text());
    }
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await page.evaluate(async () => {
      // Trigger native lazy loading without mutating React-owned attributes
      // while streamed page boundaries may still be hydrating.
      for (const image of document.images) {
        image.scrollIntoView({ block: "center", behavior: "instant" });
        await image.decode().catch(() => {});
      }
    });
    expect(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter(
              (i) =>
                i instanceof HTMLImageElement &&
                i.complete &&
                i.naturalWidth === 0,
            )
            .map((i) => i.getAttribute("src")),
        ),
      route,
    ).toEqual([]);
    expect(await page.locator(".image-fallback").count(), route).toBe(
      route === "/community/create" ? 1 : 0,
    );
  }
  expect(errors).toEqual([]);
  await page.goto("/artworks/does-not-exist");
  await expect(
    page.getByRole("heading", { name: "A little off the beaten path." }),
  ).toBeVisible();
});
test("marketplace search, combined filters, sorting, empty state, and query navigation", async ({
  page,
}) => {
  await page.goto("/artworks");
  await expect(page.locator(".artwork-card")).toHaveCount(20);
  await page
    .getByRole("searchbox", { name: "Search artwork, subject, or keyword…" })
    .fill("mountain glow");
  await expect(page.locator(".artwork-card")).toHaveCount(1);
  await page.getByRole("searchbox").fill("zzzz-no-art");
  await expect(
    page.getByText("No artworks match these filters."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page
    .locator(".filter-sidebar")
    .getByLabel("Landscape", { exact: true })
    .check();
  await page
    .locator(".filter-sidebar")
    .getByLabel("Oil Painting", { exact: true })
    .check();
  await expect(page.locator(".artwork-card")).toHaveCount(2);
  await page
    .getByRole("combobox", { name: "Sort artworks" })
    .selectOption("Price: high to low");
  await expect(page.locator(".artwork-card").first()).toContainText(
    "A Place to Return",
  );
  await page
    .getByRole("button", { name: "Search Artora", exact: true })
    .click();
  await page
    .getByLabel("Search artwork, a subject, or a medium")
    .fill("golden");
  await page
    .getByRole("button", { name: "Explore artworks", exact: true })
    .click();
  await expect(page.getByRole("searchbox")).toHaveValue("golden");
});
test("favorites and follows survive reload and appear in the right collection", async ({
  page,
}) => {
  await page.goto("/artworks/mountain-glow");
  await page
    .getByRole("button", { name: "Save mountain glow", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Unsave mountain glow", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/favorites");
  await expect(page.locator(".artwork-card")).toHaveCount(1);
  await page.goto("/artists/emma-carter");
  await page.getByRole("button", { name: "Follow", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Following", exact: true }),
  ).toBeVisible();
  await page.goto("/community");
  await page.getByRole("tab", { name: "Following", exact: true }).click();
  await expect(page.locator(".post-card")).not.toHaveCount(0);
});
test("artwork viewer opens, switches views, and supports keyboard dialog dismissal", async ({
  page,
}) => {
  await page.goto("/artworks/mountain-glow");
  await page
    .getByRole("button", { name: "Brushwork detail", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Brushwork detail", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Zoom artwork", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("print cart quantities update totals, removals work, and checkout creates a demo order", async ({
  page,
}) => {
  await page.goto("/artworks/alpine-light-print");
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.goto("/cart");
  await page
    .getByRole("button", {
      name: "Increase quantity of Alpine Light · Print",
      exact: true,
    })
    .click();
  await expect(page.locator(".summary-line.total")).toContainText("$150");
  await page.reload();
  await expect(page.locator(".summary-line.total")).toContainText("$150");
  await page.getByRole("link", { name: "Continue to demo checkout" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Confirm demo order" }).click();
  await expect(
    page.getByRole("heading", { name: "Your demo order is complete." }),
  ).toBeVisible();
  await page.goto("/profile");
  await expect(
    page.getByRole("heading", { name: /Demo order ART-/ }),
  ).toBeVisible();
  await page.goto("/cart");
  await expect(
    page.getByText("A little room for something lovely."),
  ).toBeVisible();
});
test("cart removal returns to a useful empty state", async ({ page }) => {
  await page.goto("/artworks/coastal-reverie");
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.goto("/cart");
  await page
    .getByRole("button", { name: "Remove Coastal Reverie", exact: true })
    .click();
  await expect(
    page.getByText("A little room for something lovely."),
  ).toBeVisible();
});
test("commission validates, preserves draft, matches artists, reviews, and confirms", async ({
  page,
}) => {
  await page.goto("/commissions/new");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".error-text")).toContainText("at least 15");
  await page
    .getByLabel("Your idea", { exact: true })
    .fill(
      "An oil painting of our favorite mountain lake with warm sunset light.",
    );
  await page
    .getByLabel("Upload commission references")
    .setInputFiles("public/images/artworks/mountain.jpg");
  await expect(page.getByAltText("Reference 1")).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByLabel("Your idea", { exact: true })).toHaveValue(
    /favorite mountain lake/,
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".match-card").first()).toContainText(
    "Emma Carter",
  );
  await page
    .getByRole("button", { name: "Choose artist", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("1 session-only image")).toBeVisible();
  await page.getByRole("button", { name: "Submit Demo Request" }).click();
  await expect(
    page.getByRole("heading", { name: "A story worth painting." }),
  ).toBeVisible();
  await page.goto("/profile");
  await expect(page.getByText(/Saved demo request ART-/)).toBeVisible();
});
test("community post upload, immediate feed, likes, save, comments and session image behavior", async ({
  page,
}) => {
  await page.goto("/community/create");
  await page
    .getByLabel("Upload your artwork")
    .setInputFiles("public/images/artworks/flowers.jpg");
  await page.getByLabel("Give it a name").fill("My first garden study");
  await page
    .getByLabel("Tell us the story")
    .fill(
      "A little watercolor study inspired by the flowers outside my window.",
    );
  await page.getByLabel("Tags (optional)").fill("garden, watercolor, garden");
  await page.getByRole("button", { name: "Post to community" }).click();
  await expect(page.locator(".post-card").first()).toContainText(
    "My first garden study",
  );
  await page
    .getByRole("button", { name: "Like My first garden study", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Save post My first garden study",
      exact: true,
    })
    .click();
  await page
    .getByRole("link", { name: "My first garden study", exact: true })
    .first()
    .click();
  await expect(page.locator(".post-detail-image img")).toBeVisible();
  await page
    .getByLabel("Add to the conversation")
    .fill("The warm colors work beautifully with those soft edges.");
  await page.getByRole("button", { name: "Post comment", exact: true }).click();
  await expect(
    page.getByText("The warm colors work beautifully with those soft edges."),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "My first garden study" }),
  ).toBeVisible();
  await expect(
    page.getByText("The warm colors work beautifully with those soft edges."),
  ).toBeVisible();
  await expect(
    page.locator(".post-detail-image .image-fallback"),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("artora-demo-v1")?.includes("blob:"),
    ),
  ).toBe(false);
});
test("critique annotations use relative positions and restricted posts have no critique controls", async ({
  page,
}) => {
  await page.goto("/community/posts/chasing-the-last-light");
  await page
    .getByRole("button", { name: "Add constructive critique", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Critique category" })
    .selectOption("Lighting");
  const surface = page.locator(".post-detail-image");
  const box = await surface.boundingBox();
  await surface.click({
    position: { x: box!.width * 0.42, y: box!.height * 0.37 },
  });
  await page
    .getByLabel("What do you notice?")
    .fill("A little more contrast around the mountain could guide the eye.");
  await page.getByRole("button", { name: "Add feedback", exact: true }).click();
  const pin = page.getByRole("button", {
    name: /Lighting annotation .*A little more contrast/,
  });
  await expect(pin).toHaveAttribute("style", /left: 4[12]/);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(pin).toBeVisible();
  await page.reload();
  await expect(
    page
      .getByText(
        "A little more contrast around the mountain could guide the eye.",
      )
      .first(),
  ).toBeVisible();
  await page.goto("/community/posts/studio-notes-5");
  await expect(
    page.getByText(/This artist prefers: Encouragement only/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Add constructive critique" }),
  ).toHaveCount(0);
});
test("Academy filters, lesson preview, enrollment, and downloadable materials", async ({
  page,
}) => {
  await page.goto("/learn");
  await expect(page.locator(".academy-grid .course-card")).toHaveCount(8);
  await page
    .getByRole("combobox", { name: "Class category" })
    .selectOption("Digital Illustration");
  await expect(
    page.getByText("No classes available for this selection."),
  ).toBeVisible();
  await page.getByRole("combobox", { name: "Class category" }).selectOption("");
  await page
    .getByRole("combobox", { name: "Class difficulty" })
    .selectOption("Beginner");
  await expect(page.locator(".academy-grid .course-card")).toHaveCount(5);
  await page.goto("/learn/classes/paint-your-first-landscape");
  await page.getByRole("button", { name: "Preview a lesson" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Written lesson preview",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Enroll · Demo" }).click();
  await expect(
    page.getByRole("button", { name: "Demo enrollment confirmed" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Materials", exact: true }).click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download materials list" }).click();
  expect((await download).suggestedFilename()).toBe(
    "artora-materials-guide.txt",
  );
});
test("tutor booking validates and persists session selection in demo activity", async ({
  page,
}) => {
  await page.goto("/learn/tutors/sophie-morgan");
  await page.getByRole("button", { name: "Confirm demo booking" }).click();
  await expect(page.locator(".error-text")).toContainText("Choose a time");
  await page.getByRole("button", { name: "10:30 AM", exact: true }).click();
  await page.getByLabel("Duration", { exact: true }).selectOption("90");
  await expect(page.locator(".booking-summary")).toContainText("$100");
  await page.getByRole("button", { name: "Confirm demo booking" }).click();
  await expect(
    page.getByRole("heading", { name: "A little time for creativity." }),
  ).toBeVisible();
  await page.goto("/profile");
  await expect(
    page.getByText("With Sophie Morgan · 90 min · $100 demo price"),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("With Sophie Morgan · 90 min · $100 demo price"),
  ).toBeVisible();
});
test("classroom controls work without requesting media permissions", async ({
  page,
}) => {
  await page.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = () => {
      throw Error("Media permission must never be requested");
    };
  });
  await page.goto("/learn/classroom");
  await page.getByRole("button", { name: "Start lesson preview" }).click();
  await expect(
    page.getByText("01 · Look for the three biggest shapes before you begin."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Toggle simulated microphone" })
    .click();
  await page
    .getByRole("button", { name: "Show composition annotations" })
    .click();
  await expect(page.locator(".classroom-annotation")).toBeVisible();
  await page.getByRole("tab", { name: "Notes", exact: true }).click();
  await page.getByLabel("Lesson notes").fill("Look at the big shapes first.");
  await page.getByRole("tab", { name: "Chat", exact: true }).click();
  await page
    .getByLabel("Classroom message")
    .fill("I am ready to start my study.");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.getByText("I am ready to start my study.")).toBeVisible();
});
test("museum search, period filters, educational hotspots, zoom, and historical biography", async ({
  page,
}) => {
  await page.goto("/masters");
  await page.getByRole("button", { name: "Baroque", exact: true }).click();
  await expect(page.locator("#masterpieces .masterpiece-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All periods", exact: true }).click();
  await page
    .getByRole("searchbox", {
      name: "Search paintings, artists, or movements…",
    })
    .fill("Mona Lisa");
  await expect(page.locator("#masterpieces .masterpiece-card")).toHaveCount(1);
  await page.goto("/masters/artworks/mona-lisa");
  await page
    .getByRole("button", { name: "Explore Hands and pose", exact: true })
    .click();
  await expect(page.locator(".educational-note")).toContainText(
    "relaxed, overlapping hands",
  );
  await page.getByRole("tab", { name: "Details", exact: true }).click();
  await expect(page.locator(".masterpiece-text")).toContainText("77 × 53 cm");
  await page
    .getByRole("button", { name: "Zoom masterpiece", exact: true })
    .click();
  await page.getByLabel("Zoom 100%").fill("2");
  await expect(page.getByText("Zoom 200%", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Save to collection", exact: true })
    .click();
  await page.goto("/favorites");
  await page.getByRole("tab", { name: "Masterpieces", exact: true }).click();
  await expect(page.locator(".masterpiece-card")).toContainText("Mona Lisa");
  await page.goto("/masters/artists/leonardo-da-vinci");
  await expect(
    page.getByRole("heading", { name: "Leonardo da Vinci", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".life-timeline")).toContainText("1452");
});
test("mobile and tablet core routes fit the viewport, and mobile menu reaches Masters", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/",
      "/artworks",
      "/artists/emma-carter",
      "/commissions/new",
      "/community",
      "/community/create",
      "/learn",
      "/learn/tutors/sophie-morgan",
      "/learn/classroom",
      "/masters",
      "/masters/artworks/mona-lisa",
      "/masters/artists/leonardo-da-vinci",
      "/cart",
      "/checkout",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile menu" })
    .getByRole("link", { name: "Masters", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Explore the Masters." }),
  ).toBeVisible();
});
