const {When, Then} = require("@cucumber/cucumber");
const {webElement, selectorHelper} = require("../../utils");
const homePage = require("../page_objects/homePage");
const util = require("util");
const containsTextPattern = "//*[contains(normalize-space(text()), '%s')]";

When(/^Set "([^"]*)?" to userName input field$/, async function (userNameValue) {
    //нawait browser.waitForElementVisible(homePage.userNameInput, 5000);
    await webElement.setValue(homePage.userNameInput, userNameValue); 
});

When(/^Set value from "([^"]*)?" to password input field$/, async function (value) {
    try {
        const passwordSelector = util.format(containsTextPattern, "Password for all users");
        const password = await browser.execute(function(selector) {
            const element = document.evaluate(
                selector + '/following::text()[1]',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            
            if (element) {
                return element.textContent;
            } else {
                return null;
            }
        }, [passwordSelector]);

        console.log(password);

        if (password) {
            let selector = selectorHelper.getLocator(homePage.passwordInput);
            await browser.assert.visible(selector);
            await browser.setValue(selector, password);
        } else {
            console.error("Text not found.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

Then(/^Verify that "([^"]*)?" element is displayed at home page$/, async function(userNameValue) {
    const credentialsElement = await browser.element('css selector', '#login_credentials');
    const userNames = await credentialsElement.getText('css selector', '#login_credentials *');
    const isUserFound = userNames.includes(userNameValue);

    if (!isUserFound) {
        throw new Error(`User "${userNameValue}" should be displayed`);
    }

    await browser.useCss();
});

When(/^Click Login button with "([^"]*)?"$/, async function (userNameValue) {
    
    let selector = selectorHelper.getLocator(homePage.loginButton, 5000);
    await browser.assert.visible(selector);
    if (userNameValue === "locked_out_user") {
        throw new Error("User is locked out"); 
    }

    await webElement.click(selector);
});