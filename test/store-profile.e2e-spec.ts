import { test, expect } from "@playwright/test";

test("update  profile successfully", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const profileButton = page.getByRole("button",{name: "Pizza Shop"});
    await profileButton.waitFor({state: "visible"});
    await profileButton.click();

    await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

    await page.getByRole("textbox", { name: "Nome" }).fill("Pizza shop");
    await page.getByRole("textbox", { name: "Descrição" }).fill("Descrição Pizza shop");

    await page.getByRole("button", { name: "Salvar" }).click();

    await page.waitForLoadState("networkidle");


    const toast = page.getByText("Perfil salvo com sucesso");
    
    await expect(toast).toBeVisible({timeout: 6000});
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("button",{name: "Pizza shop"})).toBeVisible({timeout: 6000});
    


});