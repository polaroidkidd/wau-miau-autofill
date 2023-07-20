import { test as it } from "@playwright/test";
import path from "path";
const today = new Date();

const dateOfTreatment = today.toISOString().split("T")[0].split("-").reverse().join("");

const symptoms =
  "Simparica tablette für entwurming, Behandlung von Krallen und Kontrollkonsultation für mögliche Fehlstellung";

it("should fill out the form", async ({ page }) => {
  const FILE_TO_UPLOAD = path.relative(process.cwd(), "QUITTUNG.pdf");
  console.log("dateOfTreatment: ", dateOfTreatment);
  await page.goto(
    "https://fe.erv.ch/ch/forms-erv/wau-miau-pet-insurance.html?afAcceptLang=en"
  );
  await page
    .locator("label")
    .filter({ hasText: "Receipts with prescriptions from the veterinarian" })
    .locator("span")
    .nth(1)
    .click();
  await page
    .locator("label")
    .filter({
      hasText: "Invoices including diagnosis (veterinarian, hospital)",
    })
    .locator("span")
    .nth(1)
    .click();
  await page
    .locator("label")
    .filter({ hasText: "Veterinarian's report/certificate or medical history" })
    .locator("span")
    .nth(1)
    .click();
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page
    .getByText(
      "Drag the file here or click to select it (10 MB; jpg, png oder pdf)*"
    )
    .click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(FILE_TO_UPLOAD);
  await page.waitForTimeout(10000);
  // await page.getByLabel('Attachment').setInputFiles(FILE_TO_UPLOAD);
  await page.getByLabel("Your pet insurance/policy no.");
  await page.getByLabel("Your pet insurance/policy no.").fill("6011000083");
  await page.getByLabel("Next").click();
  await page
    .locator("label")
    .filter({ hasText: "Mr" })
    .locator("span")
    .nth(1)
    .click();
  await page.getByRole("textbox", { name: "First name" }).click();
  await page.getByRole("textbox", { name: "First name" }).fill("Danie");
  await page.getByRole("textbox", { name: "Name", exact: true }).click();
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Einars");
  await page.getByRole("textbox", { name: "Street" }).click();
  await page.getByRole("textbox", { name: "Street" }).fill("Höflistrasse");
  await page.getByRole("textbox", { name: "No." }).click();
  await page.getByRole("textbox", { name: "No." }).fill("10");
  await page.getByRole("textbox", { name: "Postcode" }).click();
  await page.getByRole("textbox", { name: "Postcode" }).fill("6030");
  await page.getByRole("textbox", { name: "Place" }).click();
  await page.getByRole("textbox", { name: "Place" }).fill("Ebikon");
  await page.getByLabel("Country").selectOption("CH");
  await page.getByLabel("E-mail").click();
  await page.getByLabel("E-mail").fill("contact@dle.dev");
  await page.getByLabel("Phone (day time)").click();
  await page.getByLabel("Phone (day time)").fill("+41786406084");
  await page.getByLabel("Account Number (IBAN)").click();
  await page.getByLabel("Account Number (IBAN)").fill("CH5700778210160142001");
  await page.getByLabel("Bank Code (BIC/SWIFT)").click();
  await page.getByLabel("Bank Code (BIC/SWIFT)").fill("LUKBCH2260A");
  await page.getByLabel("Name, post code and location of the bank").click();
  await page
    .getByLabel("Name, post code and location of the bank")
    .fill("Luzerner Kantonalbank AG, 6003 Luzern,  Pilatusstrasse 12");
  await page.getByLabel("Next").click();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("Sam");
  await page
    .locator("label")
    .filter({ hasText: "Dog" })
    .locator("span")
    .nth(1)
    .click();
  await page.getByLabel("Breed").click();
  await page.getByLabel("Breed").fill("Mixed");
  await page.getByLabel("Colour").click();
  await page.getByLabel("Colour").fill("Brown/Black");
  await page.getByLabel("Date of birth").click();
  await page.getByLabel("Date of birth").fill("02032019");
  await page.getByLabel("Microchip No. (if available)").click();
  await page.getByLabel("Microchip No. (if available)").fill("94100002569298");
  await page.getByLabel("Next").click();
  await page
    .locator(
      "#guideContainer-rootPanel-panel-panel_1471735713-helvetiadatepicker__"
    )
    .getByLabel("Date of treatments (vet)")
    .fill(dateOfTreatment);
  await page
    .getByLabel(
      "Symptoms, reason for treatment including diagnosis, description of the accident"
    )
    .fill(symptoms);
  await page
    .locator(
      "#guideContainer-rootPanel-panel-panel_1471735713-panel-helvetiatextbox_2869___guide-item"
    )
    .getByLabel("Date of the first symptoms of this disease / injury")
    .fill(dateOfTreatment);
  await page
    .locator(
      "#guideContainer-rootPanel-panel-panel_1471735713-panel-helvetiadatepicker___guide-item"
    )
    .getByLabel("Date of the first treatment of this disease / injury")
    .fill(dateOfTreatment);

  await page.locator('#guideContainer-rootPanel-panel-panel_1471735713-helvetiaradiobutton__ label').filter({ hasText: 'Yes' }).locator('span').nth(1).click();
  await page.locator('#guideContainer-rootPanel-panel-panel_1471735713-helvetiaradiobutton__ label').filter({ hasText: 'Yes' }).locator('span').nth(1).click();
  await page.locator('#guideContainer-rootPanel-panel-panel_1471735713-helvetiaradiobutton___ label').filter({ hasText: 'No' }).locator('span').nth(1).click();
  await page.getByLabel('Next').click();
  await page.getByLabel('Next').click();
  await page.locator('#guideContainer-rootPanel-pnlSummary-helvetiacheckbox__ span').nth(1).click();
  await page.locator('#guideContainer-rootPanel-pnlSummary-helvetiacheckbox_cop__ span').nth(1).click();
  await page.frameLocator('iframe[name="a-9j6lda5u78l5"]').getByLabel('I\'m not a robot').click();
  await page.frameLocator('iframe[name="c-9j6lda5u78l5"]').locator('td:nth-child(3)').first().click();
  await page.frameLocator('iframe[name="c-9j6lda5u78l5"]').locator('tr:nth-child(2) > td:nth-child(3)').click();
  await page.frameLocator('iframe[name="c-9j6lda5u78l5"]').locator('tr:nth-child(2) > td:nth-child(2)').click();
  await page.getByText('ERV', { exact: true }).click();
});
