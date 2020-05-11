const puppeteer = require('puppeteer-core');
const path = require('path');

async function prepare(variant) {
    const browser = await puppeteer.launch({ 
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', 
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto(`file:${path.join(__dirname, `../dist/${variant}.html`)}`);

    return Promise.resolve({ page, browser, });
}

function bye(browser) {
    return browser.close();
}

module.exports = {
    prepare,
    bye,
};
