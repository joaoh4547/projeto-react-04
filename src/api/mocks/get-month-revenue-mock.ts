import { http, HttpResponse } from "msw";

import { GetMonthRevenueData } from "../get-month-revenue";

export const getMonthRevenueMock = http.get<never, never, GetMonthRevenueData>(
    "metrics/month-receipt",
    () => {
        return HttpResponse.json({
            receipt: 1200,
            diffFromLastMonth: 12,
        });
    },
);
