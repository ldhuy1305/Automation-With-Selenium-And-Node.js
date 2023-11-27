const { Builder, By, until } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments("disable-infobars");
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

var Page = function () {
  this.driver = new Builder().setChromeOptions(o).forBrowser("chrome").build();

  // visit a webpage
  this.visit = async function (theUrl) {
    return await this.driver.get(theUrl);
  };

  // quit current session
  this.quit = async function () {
    return await this.driver.quit();
  };
  this.findById = async function (name) {
    return await this.driver.findElements(By.id(name));
  };
  this.findByClasses = async function (name) {
    return await this.driver.findElements(By.className(name));
  };
  this.findByClass = async function (name) {
    return await this.driver.findElement(By.className(name));
  };
  this.findByCss = async function (name) {
    return await this.driver.findElement(By.css(name));
  };
  this.findByXpath = async function (name) {
    return await this.driver.findElement(By.xpath(name));
  };
  this.write = async function (el, txt) {
    return await el.sendKeys(txt);
  };
};

module.exports = Page;
