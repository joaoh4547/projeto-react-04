import { http, HttpResponse } from "msw";

import { GetManagedRestaurantData } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
    never,
    never,
    GetManagedRestaurantData
>("managed-restaurant", () => {
    return HttpResponse.json({
        createdAt: new Date("2023-12-05T15:25.315Z"),
        updatedAt: new Date("2024-10-20T08:15.159Z"),
        description: "Pizza Shop Description",
        id: "123456",
        managerId: "1234567890",
        name: "Pizza Shop 01",
    });
});
