import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
    await page.goto("/sign-in", { waitUntil: "networkidle" });
    await page
        .getByRole("textbox", { name: "Seu e-mail" })
        .fill("johndoe@example.com");
    await page.getByRole("button", { name: "Acessar Painel" }).click();
    const toast = page.getByText(
        "Enviamos um link de autenticação para seu email",
    );

    await expect(toast).toBeVisible({timeout: 6000});
});

test("sign in with wrong credencial", async ({ page }) => {
    await page.goto("/sign-in", { waitUntil: "networkidle" });
    await page
        .getByRole("textbox", { name: "Seu e-mail" })
        .fill("wrong@example.com");
    await page.getByRole("button", { name: "Acessar Painel" }).click();
    const toast = page.getByText("Erro ao enviar email de autenticação");
    await expect(toast).toBeVisible({timeout: 6000});
});

test("navigate to restaurant page", async ({ page }) => {
    await page.goto("/sign-in", { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "Novo Estabelecimento" }).click();
    expect(page.url()).toContain("/sign-up");
});
