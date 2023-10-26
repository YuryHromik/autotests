const inventoryPage = {

    productName: "#product-name",
    productPrice: "#product-price",
    shoppingCart: "#shopping_cart_container",

    productSortSelect: {
        selector: ".product_sort_container", 
        options: {
            nameAZ: "option[value='az']", // "Name (A to Z)"
            nameZA: "option[value='za']", // "Name (Z to A)"
            priceLowHigh: "option[value='lohi']", // "Price (low to high)"
            priceHighLow: "option[value='hilo']", // "Price (high to low)"
        },

        selectByValue: async function(value) {
            await browser.selectByValue(this.selector, value);
        },
    },

    productNameSelector: ".inventory_item_name",
    productPriceSelector: ".inventory_item_price",
    productDescriptionSelector: ".inventory_item_desc",
    addToCartButtonSelector: ".btn_inventory",
    removeFromCartButtonSelector: ".inventory_item_price",
    
    getAllProductsInfo: function () {
        const productElements = browser.elements("css selector", this.productNameSelector).value;
        const productsInfo = [];
        for (let index = 0; index < productElements.length; index++) {
            const product = {
                name: browser.elementIdText(productElements[index].ELEMENT).value,
                price: browser.elementIdText(browser.elements("css selector", this.productPriceSelector).value[index].ELEMENT).value,
                description: browser.elementIdText(browser.elements("css selector", this.productDescriptionSelector).value[index].ELEMENT).value
            };
            productsInfo.push(product);
        }
        return productsInfo;
    },


    burgerMenu: {
        menuButton: "#react-burger-menu-btn",
        items: {
            allItems: "//*[@id='inventory_sidebar_link']",
            about: "//*[@id='about_sidebar_link']",
            logout: "//*[@id='logout_sidebar_link']",
            resetAppState: "//*[@id='reset_sidebar_link']"
        },

        openMenu: async function() {
            await browser.click(this.menuButton);
        },
    }
}

module.exports = inventoryPage;