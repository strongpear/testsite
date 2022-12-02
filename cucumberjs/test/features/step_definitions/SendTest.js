const assert = require("assert");
const { Given, When, And, Then, setDefaultTimeout } = require("cucumber");
const { By } = require("selenium-webdriver");
setDefaultTimeout(60*1000)
// const { default: builder } = require("cucumber/lib/formatter/builder");
const { isAsyncFunction } = require("util/types");

Given('user is on the Payment page', async function () {
    return this.page.goto("https://ghostdynos.herokuapp.com/payment");
  });

When('user enters username of the person they want to send money to and the amount', async function () {
    

    
  });

And('user clicks on the Pay button', async function() {
    await this.driver.findElement(By.linkText("Pay")).click();
  });

Then('user is navigated to the home page', async function () {
    const el = await this.page.waitForSelector("https://ghostdynos.herokuapp.com/home");
    return !!el;
  });