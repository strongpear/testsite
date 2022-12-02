const assert = require("assert");
const { Given, When, Then } = require("cucumber");
// const { default: builder } = require("cucumber/lib/formatter/builder");
const { isAsyncFunction } = require("util/types");

Given('user is on the Payment page', async function () {
    return this.page.goto("https://ghostdynos.herokuapp.com/payment");
  });

When('user enters username of the person they want to request money from and the amount', async function () {
    

    
  });

And('user clicks on the Request button', async function(string) {
    const el = await this.page.$(`[data-test="request"]`);
    await el.click();
    return el;
  });

Then('user is navigated to the home page', async function () {
    const el = await this.page.waitForSelector("https://ghostdynos.herokuapp.com/home");
    return !!el;
  });