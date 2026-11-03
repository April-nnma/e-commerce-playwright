import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base";

export class ProductPage extends BasePage {
  productName: Locator;
  originalPrice: Locator;
  salePrice: Locator;
  description: Locator;
  buttonAddToCart: Locator;
  quantityInput: Locator;
  reviewTab: Locator;
  noReviewsMessage: Locator;
  ratingForm: Locator;
  reviewForm: Locator;
  nameForm: Locator;
  emailForm: Locator;
  checkboxForm: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByRole("heading", {
      name: "FullStack Automation QA với Playwright Typescript",
      exact: true,
    });
    this.originalPrice = page.getByText("2.499.000 $").first();
    this.salePrice = page.getByText("1.749.000 $").first();
    this.description = page.getByText("Khoá học automation test từ").first();
    this.buttonAddToCart = page.getByRole("button", {
      name: "Add to cart",
      exact: true,
    });
    this.quantityInput = page.getByRole("spinbutton", {
      name: "Product quantity",
    });
    this.reviewTab = page.getByRole("tab", { name: "Reviews (0)" });
    this.noReviewsMessage = page.getByText("There are no reviews yet.");
    this.ratingForm = page.getByText("Your rating * 1 of 5 stars 2");
    this.reviewForm = page
      .getByRole("paragraph")
      .filter({ hasText: "Your review *" });
    this.nameForm = page.getByRole("paragraph").filter({ hasText: "Name *" });
    this.emailForm = page.getByRole("paragraph").filter({ hasText: "Email *" });
    this.checkboxForm = page.getByRole("checkbox", {
      name: "Save my name, email, and",
    });
  }

  async verifyProductInfo(
    name: string,
    originalPrice: string,
    salePrice: string,
    description: string,
  ) {
    await expect(this.productName).toHaveText(name);
    await expect(this.originalPrice).toContainText(originalPrice);
    await expect(this.salePrice).toContainText(salePrice);
    await expect(this.description).toContainText(description);
  }

  async verifyAddToCartEnabled() {
    await expect(this.buttonAddToCart).toBeVisible();
    await expect(this.buttonAddToCart).toBeEnabled();
  }

  async addProductToCartByQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity));
    await this.buttonAddToCart.click();
  }

  async clickReviewTab() {
    await this.reviewTab.click();
  }

  async noReview() {
    await expect(this.noReviewsMessage).toBeVisible();
  }

  async verifyFormSubmit() {
    await expect(this.ratingForm).toBeVisible();
    await expect(this.reviewForm).toBeVisible();
    await expect(this.nameForm).toBeVisible();
    await expect(this.emailForm).toBeVisible();
    await expect(this.checkboxForm).toBeVisible();
  }
}
