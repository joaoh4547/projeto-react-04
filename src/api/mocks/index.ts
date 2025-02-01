import { setupWorker } from "msw/browser";

import { env } from "@/env";

import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getDayOrderAmountMock } from "./get-day-orders-amount-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant-mock";
import { getMonthCanceledOrderAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthOrderAmountMock } from "./get-month-orders-amount-mock";
import { getMonthRevenueMock } from "./get-month-revenue-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { signInMock } from "./sign-in-mock";
import { updateProfileMock } from "./update-profile-mock";

export const worker = setupWorker(
    signInMock,
    registerRestaurantMock,
    getDayOrderAmountMock,
    getMonthOrderAmountMock,
    getMonthCanceledOrderAmountMock,
    getMonthRevenueMock,
    getDailyRevenueInPeriodMock,
    getPopularProductsMock,
    getProfileMock,
    getManagedRestaurantMock,
    updateProfileMock,
);

export async function enableMSW() {
    if (env.MODE === "test") {
        await worker.start();
    }
}
