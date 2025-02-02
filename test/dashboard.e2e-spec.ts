import { test, expect } from "@playwright/test";

test("display day order amount metrics", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(6000);
    
    expect(page.getByText("100", {exact: true})).toBeVisible();
    expect(page.getByText("+50% em relação a ontem",)).toBeVisible();
});

test("display month order amount metrics", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(6000);
    
    expect(page.getByText("300", {exact: true})).toBeVisible();
    expect(page.getByText("+50% em relação ao mes passado",)).toBeVisible();
});

test("display month canceled order amount metrics", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(6000);
    
    expect(page.getByText("5", { exact: true })).toBeVisible();
    expect(page.locator("div").filter({ hasText: /^5\+12% em relação ao mes anterior$/ }).getByRole("paragraph")).toBeVisible();
});

test("display month revenue order metric", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(6000);
    
    expect(page.getByText("R$ 12,00", {exact: true})).toBeVisible();
    expect(page.getByText("+12% em relação ao mes").first()).toBeVisible();
});