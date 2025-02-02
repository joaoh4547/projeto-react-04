import { test, expect } from "@playwright/test";

test("display day order amount metrics", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    
    await expect(page.getByText("100", {exact: true})).toBeVisible({timeout: 6000});
    await expect(page.getByText("+50% em relação a ontem",)).toBeVisible({timeout: 6000});
});

test("display month order amount metrics", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    
    await expect(page.getByText("300", {exact: true})).toBeVisible({timeout: 6000});
    await expect(page.getByText("+50% em relação ao mes passado",)).toBeVisible({timeout: 6000});
});

test("display month canceled order amount metrics", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    
    await expect(page.getByText("5", { exact: true })).toBeVisible({timeout: 6000});
    await expect(page.locator("div").filter({ hasText: /^5\+12% em relação ao mes anterior$/ }).getByRole("paragraph")).toBeVisible({timeout: 6000});
});

test("display month revenue order metric", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    
    await expect(page.getByText("R$ 12,00", {exact: true})).toBeVisible({timeout: 6000});
    await expect(page.getByText("+12% em relação ao mes").first()).toBeVisible({timeout: 6000});
});