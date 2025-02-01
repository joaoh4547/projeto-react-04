import { http, HttpResponse } from "msw";

import { GetMonthOrdersAmountData } from "../get-month-orders-amount";

export const getMonthOrderAmountMock = http.get<
    never,
    never,
    GetMonthOrdersAmountData
>("metrics/month-orders-amount", () => {
    return HttpResponse.json({
        amount: 300,
        diffFromLastMonth: 50,
    });
});
