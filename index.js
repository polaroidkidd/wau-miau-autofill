// const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

//Enable stealth mode
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';


const FILE_TO_UPLOAD = "/home/dle/Downloads/kleintierpraxis/kleintierpraxis.pdf";
const TREATMENT_DAY = "08092022";
const IS_TREATMENT_COMPLETED = false;
const IS_THIRD_PARTY_AT_FAULT = false;
const SYMPTOMS = "Wunde knöchel an den hinterpfoten";
const DATE_FOR_FIRST_SYMPTOM = "07072022";
const DATE_FOR_FIRST_TREATMENT = "08092022";

async function createPage (browser,url) {

    //Randomize User agent or Set a valid one
    const userAgent = randomUseragent.getRandom();
    const UA = userAgent || USER_AGENT;
    const page = await browser.newPage();

    //Randomize viewport size
    await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 3000 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });

    await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);

    //Skip images/styles/fonts loading for performance
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.evaluateOnNewDocument(() => {
        // Pass webdriver check
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Pass chrome check
        window.chrome = {
            runtime: {},
            // etc.
        };
    });

    await page.evaluateOnNewDocument(() => {
        //Pass notifications check
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5],
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `languages` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });

    await page.goto(url, { waitUntil: 'networkidle2',timeout: 0 } );
    return page;
}


(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await createPage(browser,"https://fe.erv.ch/ch/forms-erv/wau-miau-pet-insurance.html?afAcceptLang=en" );
    // page.setViewport({ width: 1200, height: 2160 })
    // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    // await page.goto('https://fe.erv.ch/ch/forms-erv/wau-miau-pet-insurance.html?afAcceptLang=en', {
    //     waitUntil: 'networkidle2',
    // });

    // Page 1
    await page.type("#guideContainer-rootPanel-pnl1-helvetiatextbox_2032___widget", "6011000083", { delay: 0 })
    const checkboxReceipts = await page.$('[data-t-id*="4"]')
    await checkboxReceipts.click()
    const checkboxInvoice = await page.$('[data-t-id*="5"]')
    await checkboxInvoice.click()
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click("[id='guideContainer-rootPanel-pnl1-helvetiafiledragdrop___dropzone']"),
    ]);
    await fileChooser.accept([FILE_TO_UPLOAD])
    await page.waitForNetworkIdle()
    // Screenshot & Navigate
    await page.screenshot({ path: 'screenshots/page-1.png' });
    await page.click('[id="guideContainer-rootPanel-toolbar-nextitemnav___widget"]')
    await page.waitForNetworkIdle()


    // Page 2
    await page.click('[value="Herr"]')
    const checkboxHerr = await page.$('[data-t-id*="10"]')
    await checkboxHerr.click()
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_1207467141___widget", "Daniel", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox___widget", "Einars", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_970528565___widget", "Höflistrasse", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_1860867211___widget", "10", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_1817854070___widget", "6030", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_910208556___widget", "Ebikon", { delay: 0 })
    await page.select("#guideContainer-rootPanel-pnl2_copy_copy_copy_-panel-helvetiadropdownlist_1407940182___widget", "CH")
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_327869435___widget", "contact@dle.dev", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_1053595251___widget", "0786406084", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_94672219___widget", "CH5700778210160142001", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_653473754___widget", "LUKBCH2260A", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy_copy_copy_-helvetiatextbox_1777913972___widget", "Luzerner Kantonalbank AG, 6003 Luzern,  Pilatusstrasse 12", { delay: 0 })
    // Screenshot & Navigate
    await page.screenshot({ path: 'screenshots/page-2.png' });
    await page.click('[id="guideContainer-rootPanel-toolbar-nextitemnav___widget"]')
    await page.waitForNetworkIdle()

    // Page 3
    await page.type("#guideContainer-rootPanel-pnl2_copy-helvetiatextbox___widget", "Sam", { delay: 0 })
    const checkboxAnimal = await page.$('[data-t-id*="38"]')
    await checkboxAnimal.click()
    await page.type("#guideContainer-rootPanel-pnl2_copy-helvetiatextbox_561663850___widget", "Mixed", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy-helvetiatextbox_5616___widget", "Brown/Black", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy-helvetiadatepicker___widget", "02032019", { delay: 0 })
    await page.type("#guideContainer-rootPanel-pnl2_copy-helvetiatextbox_1989189020___widget", "94100002569298", { delay: 0 })
    // Screenshot & Navigate
    await page.screenshot({ path: 'screenshots/page-3.png' });
    await page.click('[id="guideContainer-rootPanel-toolbar-nextitemnav___widget"]')
    await page.waitForNetworkIdle()

    // Page 4
    await page.type("#guideContainer-rootPanel-panel-panel_1471735713-helvetiadatepicker___widget", TREATMENT_DAY, { delay: 0 })
    await page.type("#guideContainer-rootPanel-panel-panel_1471735713-helvetiatextarea___widget", SYMPTOMS, { delay: 0 })
    await page.type("#guideContainer-rootPanel-panel-panel_1471735713-panel-helvetiatextbox_2869___widget", DATE_FOR_FIRST_SYMPTOM, { delay: 0 })
    await page.type("#guideContainer-rootPanel-panel-panel_1471735713-panel-helvetiadatepicker___widget", DATE_FOR_FIRST_TREATMENT, { delay: 0 })

    if(IS_TREATMENT_COMPLETED){
        const treatmentCompletedCheckbox = await page.$('[data-t-id*="64"]')
        await treatmentCompletedCheckbox.click()
    }else{
        const treatmentCompletedCheckbox = await page.$('[data-t-id*="65"]')
        await treatmentCompletedCheckbox.click()
    }

    if(IS_THIRD_PARTY_AT_FAULT){
        const thirdPartyCheckbox = await page.$('[data-t-id*="70"]')
        await thirdPartyCheckbox.click()
    }else{
        const thirdPartyCheckbox = await page.$('[data-t-id*="71"]')
        await thirdPartyCheckbox.click()
    }
    // Screenshot & Navigate
    await page.screenshot({ path: 'screenshots/page-4.png' });
    await page.click('[id="guideContainer-rootPanel-toolbar-nextitemnav___widget"]')
    await page.waitForNetworkIdle()

    // Page 5 (contains only extra comments block)
    await page.click('[id="guideContainer-rootPanel-toolbar-nextitemnav___widget"]')
    await page.waitForNetworkIdle()

    // Page 6
    const documentCompleteCheckbox = await page.$('[data-t-id*="89"]')
    await documentCompleteCheckbox.click()

    const authorizeCheckbox = await page.$('[data-t-id*="91"]')
    await authorizeCheckbox.click()

    // const captchaCheckbox = await page.$('#recaptcha-anchor')
    // await captchaCheckbox.click()
    await page.screenshot({ path: 'screenshots/page-6.png' });

    // await browser.close();
})();