const {Then} = require("@cucumber/cucumber");
const {getLocator} = require("../../utils/selectorHelper");
const util = require("util");
const containsTextPattern = "//*[contains(normalize-space(text()), '%s')]";


Then(/^Verify that "([^"]*)?" element is( not)* present$/, async function(textName, negativeCase) {
    let locator = getLocator(util.format(containsTextPattern, textName));
    if (negativeCase) {
        await browser.assert.not.elementPresent(locator);
    } else {
        await browser.assert.elementPresent(locator);
    }
    await browser.useCss();
});

Then(/^Verify that "([^"]*)?" (button|element|form) is( not)* displayed by selector "([^"]*)?"$/, async function(textName, elementType, negativeCase, selector) {
    let locator = getLocator(selector);
    if (negativeCase) {
        await browser.assert.not.visible(locator);
    } else {
        await browser.waitForElementVisible(locator, 5000);
        await browser.assert.visible(locator);
    }
    await browser.useCss();
});