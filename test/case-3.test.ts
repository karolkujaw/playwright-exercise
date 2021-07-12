import {expect, test} from '@playwright/test';

/*
Verify that the SVG optimization is working correctly by using “Open SVG” or
“Paste markup” options from the main menu. As a file input example, you can
use below SVG:
https://www.iconfinder.com/icons/1291741/download/svg/512
 */

test('Verification of the SVG file optimization', async ({page}) => {
    await page.goto('https://jakearchibald.github.io/svgomg');
    await page.setInputFiles('input.load-file-input', './resources/strategy-icon.svg');

    expect(await page.isVisible('.settings-scroller'))

    const resultElement = await page.$('.size');
    await resultElement?.click()

    const resultText = await page.textContent('.size')
    expect(resultText).toContain('1.77k → 1.56k')
});