import { http, HttpResponse } from "msw";

import { RegisterRestaurantInput } from "../register-restaurant";

export const registerRestaurantMock = http.post<never, RegisterRestaurantInput>(
    "/restaurants",
    async ({ request }) => {
        const { restaurantName } = await request.json();

        if (restaurantName === "Pizza shop") {
            return new HttpResponse(null, {
                status: 201,
            });
        }

        return new HttpResponse(null, { status: 400 });
    },
);
