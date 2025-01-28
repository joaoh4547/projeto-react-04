import { api } from "@/lib/axios";

interface GetMonthCanceledOrdersAmountData {
    amount: number;
    diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
    const response = await api.get<GetMonthCanceledOrdersAmountData>(
        "/metrics/month-canceled-orders-amount",
    );

    return response.data;
}
