const assert = require("assert");
const { Given, When, Then } = require("cucumber");
// const { default: builder } = require("cucumber/lib/formatter/builder");
const { isAsyncFunction } = require("util/types");

Given('user is on the home page', async function () {
    return this.page.goto("https://ghostdynos.herokuapp.com/home");
  });

When('user clicks on the KYC Details button', async function(string) {
    const el = await this.page.$(`[data-test="kyc"]`);
    await el.click();
    return el;
  });

Then('user is navigated to the KYC page', async function () {
    const el = await this.page.waitForSelector("https://ghostdynos.herokuapp.com/kyc");
    return !!el;
  });