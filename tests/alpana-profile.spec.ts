import { test, expect } from "@playwright/test";
import { alpanaPaintings } from "../src/data/alpana-barthakur";

test("the top-bar portrait opens Alpana's main profile and public portfolio", async ({
  page,
}) => {
  await page.goto("/");
  const profileLink = page.getByRole("link", {
    name: "Alpana Barthakur's profile",
    exact: true,
  });
  await expect(profileLink.locator("img")).toHaveAttribute(
    "src",
    "/images/artists/alpana-barthakur.png",
  );
  await profileLink.click();
  await expect(page).toHaveURL(/\/profile$/);
  await expect(
    page.getByRole("heading", { name: "Alpana Barthakur", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".portfolio-location")).toHaveText(
    "Hillsborough, New Jersey",
  );
  await expect(page.locator(".portfolio-painting")).toHaveCount(14);
  await expect(
    page.getByRole("tab", { name: "Reviews", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".profile-stat-row")).not.toContainText("rating");
  await page
    .getByRole("link", { name: "View public profile", exact: true })
    .click();
  await expect(page).toHaveURL(/\/artists\/alpana-barthakur$/);
  await page.getByRole("button", { name: "Follow", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Following", exact: true }),
  ).toBeVisible();
});

test("visitors discover Alpana by name or location and browse all original paintings", async ({
  page,
  request,
}) => {
  await page.goto("/artists");
  const search = page.getByRole("searchbox", {
    name: "Search by name, place, or specialty…",
  });
  await search.fill("Hillsborough");
  await expect(page.locator(".artist-card")).toHaveCount(1);
  await expect(page.locator(".artist-card")).toContainText("Alpana Barthakur");
  await search.fill("Alpana Barthakur");
  await page
    .getByRole("heading", { name: "Alpana Barthakur", exact: true })
    .click();
  await expect(page).toHaveURL(/\/artists\/alpana-barthakur$/);
  for (const painting of alpanaPaintings) {
    expect((await request.get(painting.image)).status(), painting.title).toBe(
      200,
    );
  }
  await page
    .getByRole("button", { name: "View Bird in Flight", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Bird in Flight");
  await expect(dialog.locator("img")).toHaveCSS("object-fit", "contain");
  await page
    .getByRole("button", { name: "Next painting", exact: true })
    .click();
  await expect(dialog).toContainText("A Walk in the Rain");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Birds & animals", exact: true })
    .click();
  await expect(page.locator(".portfolio-painting")).toHaveCount(4);
  await page
    .getByRole("searchbox", { name: "Search Alpana’s paintings…" })
    .fill("kingfisher");
  await expect(page.locator(".portfolio-painting")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search Alpana’s paintings…" })
    .fill("unmatched-painting");
  await expect(
    page.getByRole("heading", { name: "No paintings match this search." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show all paintings", exact: true })
    .click();
  await expect(page.locator(".portfolio-painting")).toHaveCount(14);
});

test("the main profile works on mobile and keeps private demo activity separate", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (/hydrat|server rendered HTML/i.test(message.text()))
      errors.push(message.text());
  });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page
    .getByRole("link", { name: "Alpana Barthakur's profile", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Alpana Barthakur", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "View Under the Red Sky", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Your activity", exact: true }).click();
  await expect(page).toHaveURL(/\/profile\/activity$/);
  await expect(
    page.getByRole("link", { name: "Back to your profile", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
