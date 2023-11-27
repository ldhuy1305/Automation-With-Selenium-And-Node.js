let Page = require("./basePage");
const locator = require("../utils/locator");
let searchInput,
  searchButton,
  localButton,
  itemSelector,
  categoryButton,
  districtButton;
delay = async function (ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
Page.prototype.register = async function () {
  searchInput = await this.findByXpath(locator.searchInput);
  searchButton = await this.findByXpath(locator.searchButton);
  localButton = await this.findByXpath(locator.localButton);
  categoryButton = await this.findByXpath(locator.categoryButton);
  districtButton = await this.findByXpath(locator.districtButton);
};
Page.prototype.searchByName = async function (name) {
  await delay(1000);
  await searchInput.sendKeys(name);
  await delay(1000);
  await searchButton.click();
  await delay(1000);
};

Page.prototype.searchByCity = async function (name) {
  await delay(1000);
  await localButton.click();
  await delay(1000);
  let city = await this.findByXpath(`//span[contains(text(),'${name}')]`);
  await city.click();
  await delay(1000);
};
Page.prototype.searchByDistrict = async function (district, city) {
  await this.searchByCity(city);
  await delay(1000);
  await districtButton.click();
  await delay(1000);
  let districts = await this.findByXpath(`
  //label[contains(text(),'${district}')]`);
  await districts.click();
  await delay(1000);
};
Page.prototype.searchByCategory = async function (name) {
  await delay(1000);
  await categoryButton.click();
  await delay(1000);
  let cats = name.split(",");
  for (let i = 0; i < cats.length; i++) {
    let cat = await this.findByXpath(`//label[normalize-space()='${cats[i]}']`);
    await cat.click();
    await delay(1000);
  }
};

Page.prototype.submitKeywordAndGetResult = async function (name) {
  await this.searchByName(name);
  itemSelector = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return itemSelector;
  }, 5000);
};
Page.prototype.clickCityAndGetResult = async function (name) {
  await this.searchByCity(name);
  const list = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
Page.prototype.clickDistrictAndGetResult = async function (district, city) {
  await this.searchByDistrict(district, city);
  const list = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
Page.prototype.clickCategoryAndGetResult = async function (name) {
  await this.searchByCategory(name);
  const list = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
Page.prototype.clickCategoryCityAndGetResult = async function (name) {
  await delay(1000);

  localButton = await this.findByXpath(locator.categoryButtonXpath);
  await localButton.click();

  await delay(2000);
  let data = name.split(",");
  for (let i = 0; i < data.length - 1; i++) {
    let k = await this.findByXpath(`//label[normalize-space()='${data[i]}']`);
    await k.click();
    await delay(1000);
  }

  localButton = await this.findByXpath(locator.localButton);
  await localButton.click();

  let k = await this.findByXpath(
    `//span[contains(text(),'${data[data.length - 1]}')]`
  );
  await k.click();
  await delay(1000);
  const list = await this.findByClasses(locator.itemSelectorClass);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
module.exports = Page;
