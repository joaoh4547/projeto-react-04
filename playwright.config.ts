import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./test",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    testMatch: /.*\.e2e.spec\.ts$/,
    // reporter: "html",
    use: {
        baseURL: "http://localhost:5078",
        // trace: "on-first-retry",
    },
    webServer: {
        command: "pnpm dev:test",
        url: "http://localhost:5078",
        reuseExistingServer: !process.env.CI,
    },

    /* Configure projects for major browsers */
    // projects: [
    //     {
    //         name: "chromium",
    //         use: { ...devices["Desktop Chrome"] },
    //     },
    //     {
    //         name: "firefox",
    //         use: { ...devices["Desktop Firefox"] },
    //     },
    //     {
    //         name: "webkit",
    //         use: { ...devices["Desktop Safari"] },
    //     },
    //     /* Test against mobile viewports. */
    //     // {
    //     //   name: 'Mobile Chrome',
    //     //   use: { ...devices['Pixel 5'] },
    //     // },
    //     // {
    //     //   name: 'Mobile Safari',
    //     //   use: { ...devices['iPhone 12'] },
    //     // },
    //     /* Test against branded browsers. */
    //     // {
    //     //   name: 'Microsoft Edge',
    //     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //     // },
    // {
    //     name: "Google Chrome",
    //     use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
    // ],
});
