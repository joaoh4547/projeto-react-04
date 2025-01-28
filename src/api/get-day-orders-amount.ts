import { api } from "@/lib/axios";

interface GetDayOrdersAmountData {
    amount: number;
    diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
    const response = await api.get<GetDayOrdersAmountData>(
        "/metrics/day-orders-amount",
    );

    return response.data;
}
