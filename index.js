const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 2160 })
    await page.goto('https://fe.erv.ch/ch/forms-erv/wau-miau-pet-insurance.html?afAcceptLang=en', {
        waitUntil: 'networkidle2',
    });
    await page.type("#guideContainer-rootPanel-pnl1-helvetiatextbox_2032___widget", "6011000083", { delay: 100 })

    const checkboxReceipts = await page.$('[data-t-id*="4"]')
    await checkboxReceipts.click()

    const checkboxInvoice = await page.$('[data-t-id*="5"]')
    await checkboxInvoice.click()

    await page.screenshot({ path: 'example.png' });
    await browser.close();
})();