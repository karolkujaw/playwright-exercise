import {expect, test} from "@playwright/test";

/*
Ensure that global optimization options like “Remove comments”, “Remove
<metadata>” and “Remove XML instructions” are working correctly using “Demo”
options from the main menu. Use the “MARKUP” tab to verify SVG output for
mentioned global optimization options on the fly.
 */

test("Verification of the content of downloaded SVG markup", async ({page}) => {
    await page.goto('https://jakearchibald.github.io/svgomg')

    const tokenPrologSelector = '.token.prolog'
    const tokenCommentSelector = '.token.comment'
    const metadataSelector = 'span[text=metadata]'

    await page.click('text=Demo')
    await page.click('text=RESET ALL')

    const checkbox = await page.$('input[name=original]')
    if (!checkbox) throw new Error('Invalid Page')

    await page.click('input[value=code]', {force: true})

    expect(await page.$(tokenPrologSelector)).toBeFalsy()
    await page.click('text=Remove XML instructions')
    expect(await page.$(tokenPrologSelector)).toBeTruthy()

    expect(await page.$(tokenCommentSelector)).toBeFalsy()
    await page.click('text=Remove comments')
    expect(await page.$(tokenCommentSelector)).toBeTruthy()

    expect(await page.$(metadataSelector)).toBeFalsy()
    await page.click('text=Remove \<metadata\>')
    expect(await page.$(metadataSelector)).toBeNull()
});