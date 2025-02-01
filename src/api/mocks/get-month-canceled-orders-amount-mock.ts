import { http, HttpResponse } from "msw";

import { GetMonthCanceledOrdersAmountData } from "../get-month-canceled-orders-amount";

export const getMonthCanceledOrderAmountMock = http.get<
    never,
    never,
    GetMonthCanceledOrdersAmountData
>("metrics/month-canceled-orders-amount", () => {
    return HttpResponse.json({
        amount: 5,
        diffFromLastMonth: 12,
    });
});
