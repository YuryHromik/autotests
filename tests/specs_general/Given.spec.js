const {Given} = require("@cucumber/cucumber");

Given(/^Open website home page$/, async function() {
    await browser.window.maximize().url(`${process.env.URL}`);
});