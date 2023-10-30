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

    elementInventoryItemSelector: ".inventory_item",
    productNameSelector: ".inventory_item_name",
    productPriceSelector: ".inventory_item_price",
    productDescriptionSelector: ".inventory_item_desc",
    addToCartButtonSelector: ".btn_inventory",
    removeFromCartButtonSelector: ".btn_inventory",

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