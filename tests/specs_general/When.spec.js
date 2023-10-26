const {When} = require("@cucumber/cucumber");
const {getLocator} = require("../../utils/selectorHelper");

When(/^Wait for "([^"]*)" milliseconds$/, async function(timeMilliseconds) {
    await browser.pause(timeMilliseconds);
});

When(/^(Click|Doubleclick) "([^"]*)?" ([^"]*)? by selector "([^"]*)?"$/, async function(clickType, elementText, elementType, selector) {
    await browser.waitForElementVisible(getLocator(selector), 5000);
    clickType === "doubleClick" ? await browser.doubleClick(getLocator(selector)) : await browser.click(getLocator(selector));
    await browser.useCss();
});