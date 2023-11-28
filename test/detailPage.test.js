const { describe, it, after, before } = require("mocha");
const Page = require("../lib/detailPage");

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

process.on("unhandledRejection", () => {});

(async function example() {
  try {
    describe("Update profile", async function () {
      this.timeout(50000);
      let driver, page;
      beforeEach(async () => {
        page = new Page();
        driver = page.driver;
        await page.visit("https://falth.vercel.app/user/profile");
        await page.registerForLogin();
        await page.login("bongmaxuyentuong1@gmail.com", "leduchuy123");
        await page.visit("https://falth.vercel.app/user/profile");
        await page.registerForDetail();
      });

      afterEach(async () => {
        await page.quit();
      });
      it("Don't change anything", async function () {
        const result = await page.changeInfo(
          undefined,
          undefined,
          undefined,
          undefined
        );
        expect(result).to.equal(true);
      });
      it("Change everything", async function () {
        const result = await page.changeInfo(
          "Đức Huy",
          "Lê",
          "521 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng 550000, Việt Nam",
          "0948942954"
        );
        expect(result).to.equal(true);
      });
      it("Only change phone numbers with below 10 digits", async () => {
        const result = await page.changeInfo(
          undefined,
          undefined,
          undefined,
          "0123"
        );
        expect(result).to.equal(false);
      });
      it("Only change First Name with null", async () => {
        const result = await page.changeInfo(
          "",
          undefined,
          undefined,
          undefined
        );
        expect(result).to.equal(false);
      });
      it("Only change First Name that contains the digits", async () => {
        const result = await page.changeInfo(
          "Đức Huy123",
          undefined,
          undefined,
          undefined
        );
        expect(result).to.equal(false);
      });
      it("Only change First Name that contains the special characters", async () => {
        const result = await page.changeInfo(
          "Đức Huy!@#",
          undefined,
          undefined,
          undefined
        );
        expect(result).to.equal(false);
      });
      it("Only change Last Name with null", async () => {
        const result = await page.changeInfo(
          undefined,
          "",
          undefined,
          undefined
        );
        expect(result).to.equal(false);
      });
      it("Only change Last Name that contains the digits", async () => {
        const result = await page.changeInfo(
          undefined,
          "Lê123",
          undefined,
          undefined
        );
        expect(result).to.equal(false);
      });
      it("Only change Phone Number that contains the letters", async () => {
        const result = await page.changeInfo(
          undefined,
          undefined,
          undefined,
          "a123456789"
        );
        expect(result).to.equal(false);
      });
      it("Only change Phone Number that contains the special characters", async () => {
        const result = await page.changeInfo(
          undefined,
          undefined,
          undefined,
          "!123456789"
        );
        expect(result).to.equal(false);
      });
      it("Only change the Phone Number without 0", async () => {
        const result = await page.changeInfo(
          undefined,
          undefined,
          undefined,
          "1123456789"
        );
        expect(result).to.equal(false);
      });
    });
  } catch (ex) {
    console.log(new Error(ex.message));
  } finally {
  }
})();
