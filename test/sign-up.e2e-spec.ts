import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
    await page.goto("/sign-up", { waitUntil: "networkidle" });
    await page.getByRole("textbox", { name: "Nome do estabelecimento" }).fill("Pizza shop");
    await page.getByRole("textbox", { name: "Seu nome" }).fill("John Due");
    await page.getByRole("textbox", { name: "Seu e-mail" }).fill("johndue@example.com");
    await page.getByRole("textbox", { name: "Seu celular" }).fill("17996558294");
    await page.getByRole("button", { name: "Finalizar Cadastro" }).click();

    const toast = page.getByText("Restaurante cadastrado com sucesso");

    await expect(toast).toBeVisible();
});

test("sign up with erro", async ({ page }) => {
    await page.goto("/sign-up", { waitUntil: "networkidle" });
    await page.getByRole("textbox", { name: "Nome do estabelecimento" }).fill("Invalid Name");
    await page.getByRole("textbox", { name: "Seu nome" }).fill("John Due");
    await page.getByRole("textbox", { name: "Seu e-mail" }).fill("johndue@example.com");
    await page.getByRole("textbox", { name: "Seu celular" }).fill("17996558294");
    await page.getByRole("button", { name: "Finalizar Cadastro" }).click();

    const toast = page.getByText("Erro ao cadastrar restaurante");
    
    await expect(toast).toBeVisible();
});

test("navigate to new login page", async ({ page }) => {
    await page.goto("/sign-up", { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "Fazer Login" }).click();
    expect(page.url()).toContain("/sign-in");
});
