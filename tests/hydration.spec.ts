import { test, expect } from "@playwright/test";

for (const injectImageStyles of [false, true]) {
  for (const route of [
    "/",
    "/artworks/coastal-notes-print",
    "/artists/emma-carter",
    "/learn/classroom",
  ]) {
    test(`hydrates ${route} ${injectImageStyles ? "with image styles added before hydration" : "without DOM mutations"}`, async ({
      page,
    }) => {
      const hydrationWarnings: string[] = [];
      page.on("console", (message) => {
        if (/hydrat|server rendered HTML/i.test(message.text())) {
          hydrationWarnings.push(message.text());
        }
      });
      page.on("pageerror", (error) => hydrationWarnings.push(error.message));

      if (injectImageStyles) {
        // Reproduce the reported browser-side mutation while HTML is parsed,
        // before React compares the DOM against its initial render.
        await page.addInitScript(() => {
          new MutationObserver((records) => {
            for (const record of records) {
              for (const node of record.addedNodes) {
                if (node instanceof HTMLImageElement) node.style.opacity = "1";
                if (node instanceof Element) {
                  node.querySelectorAll("img").forEach((image) => {
                    image.style.opacity = "1";
                  });
                }
              }
            }
          }).observe(document, { childList: true, subtree: true });
        });
      }

      await page.goto(route);
      await page
        .getByRole("button", { name: "Search Artora", exact: true })
        .click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");

      if (route === "/artworks/coastal-notes-print") {
        const detailView = page.getByRole("button", {
          name: "Brushwork detail",
          exact: true,
        });
        await detailView.click();
        await expect(detailView).toHaveAttribute("aria-pressed", "true");
        await expect(
          page.getByAltText("Brushwork detail", { exact: true }),
        ).toHaveCSS("transform", "matrix(2, 0, 0, 2, 0, 0)");
        await page
          .getByRole("button", { name: "Framed preview", exact: true })
          .click();
        await expect(
          page.getByAltText("Framed preview", { exact: true }),
        ).toHaveCSS("border-top-width", "5px");
      }

      if (route === "/") {
        await expect(page.locator(".masters-home-art > img")).toHaveCSS(
          "opacity",
          "0.82",
        );
      } else if (route === "/artists/emma-carter") {
        await expect(page.locator(".profile-cover > img")).toHaveCSS(
          "opacity",
          "0.9",
        );
      } else if (route === "/learn/classroom") {
        await expect(
          page.locator(".classroom-screen > img:not(.classroom-tutor)"),
        ).toHaveCSS("opacity", "0.65");
        await expect(page.locator(".classroom-tutor")).toHaveCSS(
          "opacity",
          "1",
        );
      }

      expect(hydrationWarnings).toEqual([]);
    });
  }
}
