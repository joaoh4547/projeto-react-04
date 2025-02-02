import { test, expect } from "@playwright/test";

test("update  profile successfully", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    const profileButton = page.getByRole("button",{name: "Pizza Shop"});
    await profileButton.waitFor({state: "visible"});
    await profileButton.click();

    await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

    await page.getByRole("textbox", { name: "Nome" }).fill("Pizza shop");
    await page.getByRole("textbox", { name: "Descrição" }).fill("Descrição Pizza shop");

    await page.getByRole("button", { name: "Salvar" }).click();

    await page.waitForLoadState("networkidle");


    const toast = page.getByText("Perfil salvo com sucesso");
    // await toast.waitFor({state: "visible"});
    await page.waitForTimeout(2000);
    expect(toast).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
    await page.waitForTimeout(1000);
    expect(page.getByRole("button",{name: "Pizza shop"})).toBeVisible();
    


});