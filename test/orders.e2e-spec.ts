import { test, expect } from "@playwright/test";


test("list orders", async ({ page }) => {
    await page.goto("/orders", { waitUntil: "networkidle" });
   
    
    await expect(page.getByRole("cell", { name: "Customer 1", exact: true })).toBeVisible({timeout: 6000});
    await expect(page.getByRole("cell", { name: "Customer 10", exact: true })).toBeVisible({timeout: 6000});
});


test("paginate orders", async ({ page }) => {
    await page.goto("/orders", { waitUntil: "networkidle" });

    await page.getByRole("button", { name: "Proxima Página" }).click();

    await expect(page.getByRole("cell", { name: "Customer 11", exact: true })).toBeVisible({timeout: 6000});
    await expect(page.getByRole("cell", { name: "Customer 20", exact: true })).toBeVisible({timeout: 6000});

    await page.getByRole("button", { name: "Última Página" }).click();
    await page.waitForTimeout(250);
    await expect(page.getByRole("cell", { name: "Customer 621", exact: true })).toBeVisible({timeout: 6000});
    await expect(page.getByRole("cell", { name: "Customer 625", exact: true })).toBeVisible({timeout: 6000});

    await page.getByRole("button", { name: "Primeira Página" }).click();
    await expect(page.getByRole("cell", { name: "Customer 1", exact: true })).toBeVisible({timeout: 6000});
    await expect(page.getByRole("cell", { name: "Customer 10", exact: true })).toBeVisible({timeout: 6000});
});

test("Filter by order id", async ({ page }) => {
    await page.goto("/orders", { waitUntil: "networkidle" });

    await page.getByRole("textbox", { name: "ID do pedido" }).fill("order-10");
    await page.getByRole("button", { name: "Filtrar resultados" }).click();
    
    await expect(page.getByRole("cell", { name: "order-10", exact: true })).toBeVisible({timeout: 6000});
});
