import { http, HttpResponse } from "msw";

import {
    GetDailyRevenueInPeriod,
    GetDailyRevenueInPeriodInput,
} from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
    never,
    GetDailyRevenueInPeriodInput,
    GetDailyRevenueInPeriod[]
>("/metrics/daily-receipt-in-period", async () => {
    return HttpResponse.json([
        {
            date: "02/01/2025",
            receipt: 1000 * 100,
        },

        {
            date: "03/01/2025",
            receipt: 1900 * 100,
        },
        {
            date: "04/01/2025",
            receipt: 3900 * 100,
        },
        {
            date: "05/01/2025",
            receipt: 300 * 100,
        },
        {
            date: "06/01/2025",
            receipt: 1300 * 100,
        },
        {
            date: "07/01/2025",
            receipt: 2100 * 100,
        },
        {
            date: "08/01/2025",
            receipt: 2350 * 100,
        },
    ]);
});
