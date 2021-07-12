import {expect, test} from '@playwright/test';

/*
Ensure that “Open SVG” and “About” options in the main menu are working
properly.
 */

test('Verification of the main menu elements - "Open SVG" and "About" buttons', async ({page}) => {
    await page.goto('https://jakearchibald.github.io/svgomg');

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('text="Open SVG"')
    ]);
    await fileChooser.element().isVisible();

    const aboutButton = await page.$('text=About');
    await aboutButton?.click();
    expect(page.url()).toBe('https://github.com/jakearchibald/svgomg/blob/master/README.md');
});