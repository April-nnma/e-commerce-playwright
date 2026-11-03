import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home";

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await homePage.navigateHomePage();

    await use(homePage);
  },
});
  