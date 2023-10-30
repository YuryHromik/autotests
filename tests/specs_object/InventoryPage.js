const {When, Then} = require("@cucumber/cucumber");
const {webElement, selectorHelper} = require("../../utils");
const inventoryPage = require("../page_objects/inventoryPage");


When(/^Click logout link at burgerMenu$/, async function () {
    
    await inventoryPage.burgerMenu.openMenu();
    let selector = selectorHelper.getLocator(inventoryPage.burgerMenu.items.logout);
    await webElement.click(selector);
});

When(/^Add all available items to Cart$/, async function () {
    const productsInfo = [];
    const productElements = await browser.elements('css selector', '.inventory_item');
  
    for (let index = 0; index < productElements.length; index++) {
      
      const nameElement = await browser.element('css selector', `.inventory_item:nth-child(${index + 1}) .inventory_item_name`);
      const name = await nameElement.getText();
  
      const priceElement = await browser.element('css selector', `.inventory_item:nth-child(${index + 1}) .inventory_item_price`);
      const price = await priceElement.getText();
  
      const descriptionElement = await browser.element('css selector', `.inventory_item:nth-child(${index + 1}) .inventory_item_desc`);
      const description = await descriptionElement.getText();
  
      productsInfo.push({
        name,
        price,
        description,
      });
  
      const addToCartButton = await browser.element('css selector', `.inventory_item:nth-child(${index + 1}) .btn_inventory`);
      await addToCartButton.click();
    }
  
    return productsInfo;
  });

  When(/^Remove all items from Cart$/, async function () {
    const cartItems = await browser.elements('css selector', '.cart_item');
  
    for (let index = 0; index < cartItems.length; index++) {
      const removeFromCartButton = await browser.element('css selector', `.cart_item .cart_button`);
      await removeFromCartButton.click();
    }
  });
  

  Then(/^Verify number of elements by selector "([^"]*)" in the Cart equals "([^"]*)"$/, async function(selector, number){
    async function verifyElementCount(selector, expectedCount) {
        const locator = selectorHelper.getLocator(selector);
      
        if (expectedCount === 0) {
          await browser.expect.element(locator).to.not.be.present;
        } else {
          await browser.waitForElementVisible(locator, 3000);
          await browser.assert.elementsCount(locator, expectedCount);
        }
      }      
    
      await verifyElementCount(selector, +number);
    });