const {When} = require("@cucumber/cucumber");
const {webElement, selectorHelper} = require("../../utils");
const inventoryPage = require("../page_objects/inventoryPage");


When(/^Click logout link at burgerMenu$/, async function () {
    
    await inventoryPage.burgerMenu.openMenu();
    let selector = selectorHelper.getLocator(inventoryPage.burgerMenu.items.logout);
    await webElement.click(selector);
});