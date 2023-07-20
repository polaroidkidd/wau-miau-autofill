import { defineConfig, devices } from '@playwright/test';
const config = defineConfig({
	

	// Reporter to use
	reporter: "html",

	use: {
        baseURL: "https://fe.erv.ch/ch/forms-erv/wau-miau-pet-insurance.html?afAcceptLang=en",
		// Collect trace when retrying the failed test.
		trace: "on-first-retry",
		// Viewport used for all pages in the context.
		viewport: { width: 1920, height: 1080 }
        
	},
    projects: [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ],
	testDir: ".",
	testMatch: /(.+\.)?(fill)\.[jt]s/
})

export default config;
