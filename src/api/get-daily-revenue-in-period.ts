import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriod {
    date: string;
    receipt: number;
}

interface GetDailyRevenueInPeriodInput {
    from?: Date;
    to?: Date;
}

export async function getDailyRevenueInPeriod({
    from,
    to,
}: GetDailyRevenueInPeriodInput) {
    const response = await api.get<GetDailyRevenueInPeriod[]>(
        "/metrics/daily-receipt-in-period",
        {
            params: {
                from,
                to,
            },
        },
    );
    return response.data;
}
