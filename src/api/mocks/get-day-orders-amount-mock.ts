import { http, HttpResponse } from "msw";

import { GetDayOrdersAmountData } from "../get-day-orders-amount";

export const getDayOrderAmountMock = http.get<
    never,
    never,
    GetDayOrdersAmountData
>("metrics/day-orders-amount", () => {
    return HttpResponse.json({
        amount: 100,
        diffFromYesterday: 50,
    });
});
