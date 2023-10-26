async function click(selector) {
    await browser.assert.visible(selector);
    await browser.click(selector);
}
async function setValue(selector, value) {
    await browser.assert.visible(selector);
    await browser.setValue(selector, value);
}

module.exports = {
    click,
    setValue
};