import {expect, test} from "@playwright/test";

test.describe('Test case: ', () => {
    const filePath = './resources/strategy-icon.svg'
    const downloadOptimizedFilePath = './resources/optimized/optimized-strategy-icon.svg'
    const fileInputSelector = 'input.load-file-input'
    const settingsScrollerSelector = '.settings-scroller'
    const openSvgButtonSelector = 'text="Open SVG"'
    const aboutButtonSelector = 'text=About'
    const optimizationResultSelector = '.size'
    const downloadButtonSelector = 'a:has-text("Download")'

    test.beforeEach(async ({page}) => {
        await page.goto('https://jakearchibald.github.io/svgomg');
    })

    test('Layout of the home page should contain expected base elements', async ({page}) => {
        expect(await page.isVisible('.menu'))
        expect(await page.isVisible('.section'))
        expect(await page.isVisible('.toolbar'))
    });

    test('Verification of the main menu elements - "Open SVG" and "About" buttons', async ({page}) => {
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.click(openSvgButtonSelector)
        ]);
        await fileChooser.element().isVisible()

        const aboutButton = await page.$(aboutButtonSelector)
        await aboutButton?.click()
        expect(page.url()).toBe('https://github.com/jakearchibald/svgomg/blob/master/README.md')
    });

    test('Verification of the SVG optimization', async ({page}) => {
        await page.setInputFiles(fileInputSelector, filePath)
        expect(await page.isVisible(settingsScrollerSelector))

        const resultElement = await page.$(optimizationResultSelector);
        await resultElement?.click()

        const resultText = await page.textContent(optimizationResultSelector)
        expect(resultText).toContain('1.77k → 1.56k')
    });

    test('Verify optimization for uploaded then downloaded SVG', async ({page}) => {
        await page.setInputFiles(fileInputSelector, filePath)

        expect(await page.isVisible(settingsScrollerSelector))

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click(downloadButtonSelector)
        ]);
        await download.saveAs(downloadOptimizedFilePath)
    });

    test("Verification of the content of downloaded SVG markup", async ({page}) => {
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

});