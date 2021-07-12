import {expect, test} from "@playwright/test";
import { readFileSync } from 'fs';


/*
Verify downloaded SVG file contents eg. by checking SVG markup or specific
attributes.
 */

test("Verification of the content of downloaded SVG markup", async ({page}) => {
    await page.goto('https://jakearchibald.github.io/svgomg');
    await page.setInputFiles('input.load-file-input', './resources/strategy-icon.svg');

    expect(await page.isVisible('.settings-scroller'))

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('a:has-text("Download")')
    ]);

    await download.saveAs('./resources/optimized/optimized-strategy-icon.svg')
    const file = readFileSync('./resources/optimized/optimized-strategy-icon.svg');

    expect(file.toString()).toContain('0 0 512.375 512.375');

});