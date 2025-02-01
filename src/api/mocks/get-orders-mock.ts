import { http, HttpResponse } from "msw";

import { GetOrdersData } from "../get-orders";

type Orders = GetOrdersData["orders"];
type OrderStatus = Orders[number]["status"];

const statuses: OrderStatus[] = [
    "canceled",
    "pending",
    "delivered",
    "processing",
    "delivering",
];

const orders: Orders = Array.from({ length: 625 }).map((_, i) => {
    return {
        orderId: `order-${i + 1}`,
        createdAt: new Date(),
        status: statuses[i % 5],
        customerName: `Customer ${i + 1}`,
        total: Math.random() * 100,
    };
});

export const getOrdersMock = http.get<never, never, GetOrdersData>(
    "orders",
    async ({ request }) => {
        const params = new URL(request.url).searchParams;

        const pageIndex = params.get("pageIndex")
            ? Number(params.get("pageIndex"))
            : 0;

        const customerName = params.get("customerName");
        const orderId = params.get("orderId");
        const status = params.get("status");

        let filteredOrders = orders;

        if (customerName) {
            filteredOrders = filteredOrders.filter((order) =>
                order.customerName
                    .toLowerCase()
                    .includes(customerName.toLowerCase()),
            );
        }

        if (orderId) {
            filteredOrders = filteredOrders.filter(
                (order) => order.orderId === orderId,
            );
        }

        if (status && status !== "all") {
            filteredOrders = filteredOrders.filter(
                (order) => order.status === status,
            );
        }

        const perPage = 10;
        const startIndex = pageIndex * perPage;

        const endIndex = (pageIndex + 1) * perPage;

        const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

        return HttpResponse.json({
            orders: paginatedOrders,
            meta: {
                pageIndex,
                perPage,
                totalCount: filteredOrders.length,
            },
        });
    },
);
