import { http, HttpResponse } from "msw";

import { UpdateProfileInput } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfileInput>(
    "/profile",
    async ({ request }) => {
        const { name } = await request.json();
        console.log(name);
        console.log(name);
        if (name === "Pizza shop") {
            return new HttpResponse(null, {
                status: 204,
            });
        }

        return new HttpResponse(null, { status: 400 });
    },
);
