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
  // let districts = await this.findByXpath(`
  // //label[contains(text(),'${district}')]`);
  let districts = district.split(",");
  for (let i = 0; i < districts.length; i++) {
    let but = await this.findByXpath(`
    //label[contains(text(),'${districts[i]}')]`);
    await but.click();
    await delay(1000);
  }
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
Page.prototype.clickCategoryCityAndGetResult = async function (cat, city) {
  await this.searchByCity(city);
  await this.searchByCategory(cat);
  const list = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
Page.prototype.clickCategoryDistrictAndGetResult = async function (
  cat,
  district,
  city
) {
  await this.searchByDistrict(district, city);
  await this.searchByCategory(cat);
  const list = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
Page.prototype.clickCategoryDistrictSearchAndGetResult = async function (
  name,
  cat,
  district,
  city
) {
  await this.searchByName(name);
  await this.searchByCategory(cat);
  await this.searchByDistrict(district, city);
  const list = await this.findByClasses(locator.itemSelector);
  return await this.driver.wait(async function () {
    return list;
  }, 5000);
};
module.exports = Page;
