import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base";

export class HomePage extends BasePage {
  homepageURL: string;
  title: Locator;
  searchInput: Locator;
  menuHome: Locator;
  menuCourses: Locator;
  menuBlog: Locator;
  productTitles: Locator;
  resultCount: Locator;
  productName: Locator;
  originalPrice: Locator;
  salePrice: Locator;
  buttonAddToCart: Locator;

  constructor(page: Page) {
    super(page);
    this.homepageURL = "https://e-commerce-dev.betterbytesvn.com/";
    this.title = page.getByRole("link", { name: "E-commerce site testing" });
    this.searchInput = page.getByRole("textbox", {
      name: "Search products...",
    });
    this.menuHome = page.getByRole("link", { name: "TRANG CHỦ" });
    this.menuCourses = page.getByRole("link", { name: "DANH SÁCH KHOÁ HỌC" });
    this.menuBlog = page.getByRole("link", { name: "BLOG" });
    this.productTitles = page.locator(".woocommerce-loop-product__title");
    this.resultCount = page.getByText("Showing");
    this.productName = page
      .getByRole("link", {
        name: "FullStack Automation QA với",
      })
      .nth(1);
    this.originalPrice = page.getByText("2.499.000 $").first();
    this.salePrice = page.getByText("1.749.000 $").first();
    this.buttonAddToCart = page
      .getByRole("button", { name: "Add to cart: “FullStack" })
      .first();
  }

  async navigateHomePage() {
    await this.page.goto(this.homepageURL);
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press("Enter");
  }

  async verifyTitle() {
    await expect(this.title).toBeVisible();
  }

  async verifySearchInput() {
    await expect(this.searchInput).toBeVisible();
  }

  async verifyMenu() {
    await expect(this.menuHome).toBeVisible();
    await expect(this.menuCourses).toBeVisible();
    await expect(this.menuBlog).toBeVisible();
  }

  // ket qua hien thi deu chua tu "ISTQB"
  async verifyAllResultsContainKeyword(keyword: string) {
    await expect(this.productTitles.first()).toBeVisible();
    const titles = await this.productTitles.allTextContents();
    for (const title of titles) {
      expect(title).toContain(keyword);
    }
  }

  // hien thi text showing
  async verifyShowingResultsText() {
    await expect(this.resultCount).toBeVisible();
  }

  // tong ket qua = X
  async verifyTotalResults() {
    const total = await this.productTitles.count();
    await expect(this.resultCount).toContainText(`${total}`);
  }

  async chooseProduct() {
    await this.productName.click();
  }

  async verifyProduct() {
    await expect(this.productName).toBeVisible();
    await expect(this.originalPrice).toBeVisible();
    await expect(this.salePrice).toBeVisible();
    await expect(this.buttonAddToCart).toBeVisible();
  }
}
