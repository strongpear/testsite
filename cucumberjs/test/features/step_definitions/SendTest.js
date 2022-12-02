const assert = require("assert");
const { Given, When, And, Then, setDefaultTimeout } = require("cucumber");
const { By } = require("selenium-webdriver");
setDefaultTimeout(60*1000)
// const { default: builder } = require("cucumber/lib/formatter/builder");
const { isAsyncFunction } = require("util/types");
const { threadId } = require("worker_threads");

Given('user is on the Payment page', async function () {
    return this.page.goto("https://ghostdynos.herokuapp.com/payment");
  });

When('user enters username of the person they want to send money to, the amount, and the message', async function () {
    await this.driver.findElement(By.id("receiver")).sendKeys("username123");
    await this.driver.findElement(By.id("amount")).sendKeys("50");
    await this.driver.findElement(By.id("message")).sendKeys("testing");
    
  });

And('user clicks on the Pay button', async function() {
    await this.driver.findElement(By.id("sub_btn")).click();
  });

Then('user is navigated to the home page', async function () {
    await this.driver.findElement(By.id("sub_btn")).isDisplayed();
    driver.close();
    driver.quit();
  });