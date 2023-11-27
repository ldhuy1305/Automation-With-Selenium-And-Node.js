const { describe, it, after, before } = require("mocha");
const Page = require("../lib/homePage");

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

process.on("unhandledRejection", () => {});

(async function example() {
  try {
    describe("Google search automated testing", async function () {
      this.timeout(50000);
      let driver, page;

      beforeEach(async () => {
        page = new Page();
        driver = page.driver;
        await page.visit("https://falth.vercel.app/");
        await page.register();
      });

      afterEach(async () => {
        await page.quit();
      });

      // it("Find Ocha in search box and click search button", async () => {
      //   const result = await page.submitKeywordAndGetResult("Ocha");
      //   expect(result.length).to.be.equal(1);
      // });

      // it("Find Ocha with s in search box and click search button", async () => {
      //   const result = await page.submitKeywordAndGetResult("Ochas");
      //   expect(result.length).to.be.equal(0);
      // });
      // it("Click search button", async () => {
      //   const result = await page.clickCityAndGetResult("Hà Nội");
      //   expect(result.length).to.be.equal(0);
      // });
      it("Click search button", async () => {
        const result = await page.clickDistrictAndGetResult(
          "Quận Sơn Trà",
          "Đà Nẵng"
        );
        expect(result.length).to.be.above(0);
      });
      // it("Click search button", async () => {
      //   const result = await page.clickCategoryAndGetResult("Gà rán");
      //   expect(result.length).to.be.above(0);
      // });
      // it("Click search button", async () => {
      //   const result = await page.clickCategoryAndGetResult("Xúc xích");
      //   expect(result.length).to.be.above(0);
      // });
      // it("Click search button", async () => {
      //   const result = await page.clickCategoryAndGetResult("Xúc xích,Gà rán");
      //   expect(result.length).to.be.above(0);
      // });
      // it("Click search button", async () => {
      //   const result = await page.clickCategoryAndGetResult(
      //     "Gà rán,Xúc xích,Thức uống"
      //   );
      //   expect(result.length).to.be.equal(0);
      // });
      // it("Click search button", async () => {
      //   const result =
      //     await page.clickCategoryCityAndGetResult("Gà rán,Đà Nẵng");
      //   expect(result.length).to.be.equal(2);
      // });
    });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
