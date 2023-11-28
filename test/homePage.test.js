const { describe, it, after, before } = require("mocha");
const Page = require("../lib/homePage");

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

process.on("unhandledRejection", () => {});

(async function example() {
  try {
    describe("Search store in https://falth.vercel.app", async function () {
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

      it("Search Och in search box and click search button", async () => {
        const result = await page.search("Och");
        expect(result.length).to.be.above(0);
      });

      it("Search Ochas in search box and click search button", async () => {
        const result = await page.search("Ochas");
        expect(result.length).to.be.equal(0);
      });
      it("Click 'Hà Nội' in drop-down city", async () => {
        const result = await page.clickCityAndGetResult("Hà Nội");
        expect(result.length).to.be.equal(0);
      });
      it("Click 'Đà Nẵng' in drop-down city and choose 'Quận Liên Chiểu' in drop-down local", async () => {
        const result = await page.clickDistrictAndGetResult(
          "Quận Liên Chiểu",
          "Đà Nẵng"
        );
        expect(result.length).to.be.above(0);
      });
      it("Click 'Đà Nẵng' in drop-down city then choose 'Quận Liên Chiểu' and 'Quận Sơn Trà' in drop-down local", async () => {
        const result = await page.clickDistrictAndGetResult(
          "Quận Liên Chiểu,Quận Sơn Trà",
          "Đà Nẵng"
        );
        expect(result.length).to.be.above(0);
      });
      it("Click drop-down category and choose 'Xúc xích' and 'Gà rán'", async () => {
        const result = await page.clickCategoryAndGetResult("Xúc xích,Gà rán");
        expect(result.length).to.be.above(0);
      });
      it("Click drop-down category and choose 'Xúc xích','Gà rán' and 'Thức uống'", async () => {
        const result = await page.clickCategoryAndGetResult(
          "Gà rán,Xúc xích,Thức uống"
        );
        expect(result.length).to.be.equal(0);
      });
      it("Click 'Đà Nẵng' in drop-down city and choose 'Xúc xích','Gà rán' and 'Thức uống' in drop-down category ", async () => {
        const result = await page.clickCategoryCityAndGetResult(
          "Gà rán,Xúc xích",
          "Đà Nẵng"
        );
        expect(result.length).to.be.above(0);
      });
      it("Click 'Hà Nội' in drop-down city and then choose 'Quận Hoàng Mai' in drop-down local and choose 'Xúc xích','Gà rán' and 'Thức uống' in drop-down category ", async () => {
        const result = await page.clickCategoryDistrictAndGetResult(
          "Gà rán,Xúc xích",
          "Quận Hoàng Mai",
          "Hà Nội"
        );
        expect(result.length).to.be.equal(0);
      });
      it("Firt search with 'm',then choose 'Gà rán' drop-down category. after Click 'Đà Nẵng' in drop-down city and then choose 'Quận Sơn Trà','Quận Liên Chiểu' in drop-down local", async () => {
        const result = await page.clickCategoryDistrictSearchAndGetResult(
          "m",
          "Gà rán",
          "Quận Sơn Trà,Quận Liên Chiểu",
          "Đà Nẵng"
        );
        expect(result.length).to.be.equal(0);
      });
    });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
