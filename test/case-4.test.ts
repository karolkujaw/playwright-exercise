import {expect, test} from '@playwright/test';

/*
Ensure that uploaded / pasted SVG (using default settings) can be downloaded
with reduced file size after optimizations.
 */

test('Verification of the optimization for uploaded and then downloaded SVG file', async ({page}) => {
    await page.goto('https://jakearchibald.github.io/svgomg')
    await page.setInputFiles('input.load-file-input', './resources/strategy-icon.svg');

    expect(await page.isVisible('.settings-scroller'))

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('a:has-text("Download")')
    ])

    await download.saveAs('./resources/optimized/optimized-strategy-icon.svg')

    const sizeAfterCommentsRemoval = await page.textContent('.size')
    expect(sizeAfterCommentsRemoval).toContain('1.77k → 1.56k')
    const diffDecreaseAfterCommentsRemoval = await page.textContent('span.diff.decrease')
    await console.log("This is the result: ", diffDecreaseAfterCommentsRemoval)
    expect(diffDecreaseAfterCommentsRemoval).toContain('87.83%')
});