const puppeteer = require('puppeteer-core');
const path = require('path');

describe('App', () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        });
        page = await browser.newPage();
        await page.goto(path.resolve(__dirname, '../dist/index.html'));
    });

    afterEach(async () => {
        await browser.close();
    });

    it('adds an entry after one clicks on "ADD" button', async () => {
        // Arrange
        const rowsBefore = await page.$eval('table tbody', e => e.children.length);

        // Act
        await page.click('form button');

        // Assert
        const rowsAfter = await page.$eval('table tbody', e => e.children.length);
        expect(rowsAfter - rowsBefore).toEqual(1);
    });

    it('prevents add of an entry with non-positive amount', async () => {
        // Arrange
        const rowsBefore = await page.$eval('table tbody', e => e.children.length);

        // Act

        // Act 1. Tune table filter.
        await page.focus('.js-9-entries-table input[type="number"]');
        const defaultInputLengthFilter = await page.$eval('.js-9-entries-table input[type="number"]', e => e.value.length);
        for (let i = 0; i < defaultInputLengthFilter; i++)
            await page.keyboard.press('Backspace');
        page.keyboard.type('0');

        // Act 2. Add record with zero amount.
        await page.focus('form input[type="number"]');
        const defaultInputLength = await page.$eval('form input[type="number"]', e => e.value.length);
        for (let i = 0; i < defaultInputLength; i++)
            await page.keyboard.press('Backspace');
        page.keyboard.type('0');

        await page.click('form button');

        // Assert
        const rowsAfter = await page.$eval('table tbody', e => e.children.length);
        expect(rowsAfter).toEqual(rowsBefore);
    });

    it('removes an entry after one clicks on "REMOVE" button', async () => {
        // Arrange
        const rowsBefore = await page.$eval('table tbody', e => e.children.length);
        expect(rowsBefore).toBeGreaterThan(0);

        // Act
        await page.click('table button');

        // Assert
        const rowsAfter = await page.$eval('table tbody', e => e.children.length);
        expect(rowsAfter - rowsBefore).toEqual(-1);
    });
});