import { http, HttpResponse } from "msw";

import { GetPopularProducts } from "../get-popular-products";

export const getPopularProductsMock = http.get<
    never,
    never,
    GetPopularProducts[]
>("/metrics/popular-products", async () => {
    return HttpResponse.json([
        { product: "Piza Peperoni", amount: 500 },
        { product: "Hamburger Bacon", amount: 400 },
        { product: "Pasta Carbonara", amount: 300 },
        { product: "Salad", amount: 200 },
        { product: "Pizza Margherita", amount: 100 },
    ]);
});
