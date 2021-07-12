import {expect, test} from '@playwright/test';

/*
Open the application URL (https://jakearchibald.github.io/svgomg) and verify the
layout by checking if the main menu, section and toolbar are available in the
application.
 */

test('Layout of the home page should contain expected base elements', async ({ page }) => {
    await page.goto('https://jakearchibald.github.io/svgomg');
    expect(await page.isVisible('.menu'))
    expect(await page.isVisible('.section'))
    expect(await page.isVisible('.toolbar'))
});