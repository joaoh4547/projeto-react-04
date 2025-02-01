import { http, HttpResponse } from "msw";

import {
    GetOrderDetailsData,
    GetOrderDetailsInput,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
    GetOrderDetailsInput,
    never,
    GetOrderDetailsData
>("orders/:orderId", ({ params }) => {
    return HttpResponse.json({
        id: params.orderId,
        createdAt: new Date(),
        status: "pending",
        totalInCents: 1300,
        customer: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 123-456-7890",
        },
        orderItems: [
            {
                id: "123",
                priceInCents: 500,
                quantity: 2,
                product: {
                    name: "Pizza",
                },
            },
            {
                id: "456",
                priceInCents: 300,
                quantity: 1,
                product: {
                    name: "Salad",
                },
            },
        ],
    });
});
