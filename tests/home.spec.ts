import { productData } from "./data/product.data";
import { test } from "../src/fixtures/home.fixture";
import { ProductPage } from "../src/pages/product";
import { reviewData } from "./data/review.data";
import { HomePage } from "../src/pages/home";

test.describe("HOME", () => {
  test("HOME_001: Kiểm tra homepage hiển thị thành công", async ({
    homePage,
  }) => {
    await test.step("Đi tới trang: https://e-commerce-dev.betterbytesvn.com/ ", async () => {
      // Assert
      await homePage.verifyTitle();
      await homePage.verifySearchInput();
      await homePage.verifyMenu();
    });
  });

  test("HOME_002: Kiểm tra tính năng search hoạt động đúng không", async ({
    homePage,
  }) => {
    // Arrange
    const keyword = "ISTQB";

    await test.step('Search keyword: "ISTQB"', async () => {
      //Act
      await homePage.search(keyword);

      // Assert
      await homePage.verifyAllResultsContainKeyword(keyword);
      await homePage.verifyShowingResultsText();
      await homePage.verifyTotalResults();
    });
  });
});

test.describe("PRODUCT", () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ homePage, page }) => {
    await test.step("Step 1: Kiem tra khoa hoc tren Home con hang", async () => {
      await homePage.verifyProduct();
    });

    await test.step("Step 2: Truy cap vao khoa hoc", async () => {
      await homePage.chooseProduct();
    });
    productPage = new ProductPage(page);
  });

  test("PRODUCT_001: Verify product page hien thi dung voi thong tin san pham", async () => {
    await test.step("Step 3: Kiem tra thong tin chi tiet cua khoa hoc", async () => {
      await productPage.verifyProductInfo(
        productData.name,
        productData.originalPrice,
        productData.salePrice,
        productData.description,
      );
      await productPage.verifyAddToCartEnabled();
      await productPage.addProductToCartByQuantity(productData.quantity);
    });
  });

  test("PRODUCT_002: Verify tinh nang product review hoat dong dung", async () => {
    await test.step("Step 3: Mở tab Reviews và kiểm tra form", async () => {
      await productPage.clickReviewTab();
      await productPage.noReview();
      await productPage.verifyFormSubmit();
    });

    await test.step("Step 4: Thuc hien viet review", async () => {
      await productPage.writeReview(
        reviewData.rating,
        reviewData.review,
        reviewData.name,
        reviewData.email,
      );
    });

    await test.step("Step 5: Verify thong tin review tren trang san pham voi dong text", async () => {
      await productPage.verifyReviewAwaitingApproval();
    });
  });

  test("PRODUCT_003: Mo trinh duyet khac va chon khoa hoc", async ({
    browser,
  }) => {
    const otherContext = await browser.newContext();
    const otherPage = await otherContext.newPage();
    const otherHomePage = new HomePage(otherPage);
    const otherProductPage = new ProductPage(otherPage);

    await otherHomePage.navigateHomePage();
    await otherHomePage.chooseProduct();
    await otherProductPage.clickReviewTab();
    await otherPage.bringToFront();

    await otherPage.pause(); 

    await otherProductPage.noReview();
  });
});
