function getLocator(selector) {
    browser.useCss();
    if (selector.includes("//")) {
        browser.useXpath();
    }

    return selector;
}

module.exports = {getLocator};