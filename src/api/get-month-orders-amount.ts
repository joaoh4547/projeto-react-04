import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountData {
    amount: number;
    diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
    const response = await api.get<GetMonthOrdersAmountData>(
        "/metrics/month-orders-amount",
    );

    return response.data;
}
