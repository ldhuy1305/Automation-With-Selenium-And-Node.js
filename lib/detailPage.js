let Page = require("./basePage");
const { By, Key, until, Actions } = require("selenium-webdriver");
const locator = require("../utils/locator");
let usernameInput,
  passwordInput,
  loginButton,
  lastNameInput,
  firstNameInput,
  addressInput,
  phoneNumberInput,
  saveButton,
  emailText,
  oldPassInput,
  newPassInput,
  confirmedPassInput,
  changeButton;

delay = async function (ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
Page.prototype.registerForLogin = async function () {
  usernameInput = await this.findByXpath(locator.usernameInput);
  passwordInput = await this.findByXpath(locator.passwordInput);
  loginButton = await this.findByXpath(locator.loginButton);
};
Page.prototype.registerForDetail = async function () {
  firstNameInput = await this.findByXpath(locator.firstNameInput);
  lastNameInput = await this.findByXpath(locator.lastNameInput);
  addressInput = await this.findByXpath(locator.addressInput);
  phoneNumberInput = await this.findByXpath(locator.phoneNumberInput);
  saveButton = await this.findByXpath(locator.saveButton);
  oldPassInput = await this.findByXpath(locator.oldPassInput);
  newPassInput = await this.findByXpath(locator.newPassInput);
  confirmedPassInput = await this.findByXpath(locator.confirmedPassInput);
  changeButton = await this.findByXpath(locator.changeButton);
  emailText = await this.findByXpath(locator.emailText);
};
Page.prototype.login = async function (username, password) {
  await delay(1000);
  await usernameInput.sendKeys(username);
  await delay(1000);
  await passwordInput.sendKeys(password);
  await delay(1000);
  await loginButton.click();
  await delay(2000);
};
Page.prototype.save = async function (button) {
  await delay(1000);
  await button.click();
  await delay(1000);
};
Page.prototype.rewrite = async function (el, txt) {
  await delay(1000);
  await el.sendKeys(Key.CONTROL, "a", Key.BACK_SPACE);
  await delay(1000);
  await el.sendKeys(txt);
};
Page.prototype.changeLastName = async function (lastName) {
  await this.rewrite(lastNameInput, lastName);
};
Page.prototype.changeFirstName = async function (firstName) {
  await this.rewrite(firstNameInput, firstName);
};
Page.prototype.changeAddress = async function (address) {
  await this.rewrite(addressInput, address);
};
Page.prototype.changePhoneNumber = async function (phoneNumber) {
  await this.rewrite(phoneNumberInput, phoneNumber);
};
Page.prototype.changeInfo = async function (
  firstName,
  lastName,
  address,
  phoneNumber
) {
  if (firstName !== undefined) await this.changeFirstName(firstName);
  if (lastName !== undefined) await this.changeLastName(lastName);
  if (address !== undefined) await this.changeAddress(address);
  if (phoneNumber !== undefined) await this.changePhoneNumber(phoneNumber);
  await this.save(saveButton);
  await delay(1000);
  return await this.check(locator.modalContent);
};
module.exports = Page;
