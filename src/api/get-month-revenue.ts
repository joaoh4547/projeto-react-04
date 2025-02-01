import { api } from "@/lib/axios";

export interface GetMonthRevenueData {
    receipt: number;
    diffFromLastMonth: number;
}

export async function getMonthRevenue() {
    const response = await api.get<GetMonthRevenueData>(
        "/metrics/month-receipt",
    );

    return response.data;
}
