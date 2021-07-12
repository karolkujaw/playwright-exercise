import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        // Browser options
        headless: false,
        slowMo: 200,

        // Context options
        viewport: {width: 1280, height: 720},
        ignoreHTTPSErrors: true,
        acceptDownloads: true,

        // Artifacts
        screenshot: 'only-on-failure',
        video: 'retry-with-video',
    },
    reporter: [["line"], ["json", { outputFile: "test-results/test-result.json" }]],
    retries: 0
};
export default config;