const { prepare, bye, } = require('./tests-base.js');

test('autonomous', async () => {
    const { page, browser, } = await prepare('autonomous');

    const props = await page.$eval('my-tree', t => t.getAttribute('content'));
    expect(props).toContain('id');
    expect(props).toContain('items');
    expect(props).toContain('101');

    await bye(browser);
}, 4000);

test('builtin', async () => {
    const { page, browser, } = await prepare('builtin');

    const props = await page.$eval('div[content]', t => t.getAttribute('content'));
    expect(props).toContain('id');
    expect(props).toContain('items');
    expect(props).toContain('101');

    await bye(browser);
}, 4000);

test('lit-html', async () => {
    const { page, browser, } = await prepare('lit-html');

    const props = await page.$eval('html > body > div', t => t.innerHTML);
    expect(props).toContain('101');

    await bye(browser);
}, 4000);

test('lit-element', async () => {
    const { page, browser, } = await prepare('lit-element');

    const props = await page.$eval('my-leaf', t => t.getAttribute('content'));
    expect(props).toContain('id');
    expect(props).toContain('items');
    expect(props).toContain('101');

    await bye(browser);
}, 4000);