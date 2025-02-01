import { http, HttpResponse } from "msw";

import { GetProfileData } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileData>(
    "me",
    () => {
        return HttpResponse.json({
            createdAt: new Date("2023-12-05T15:25.315Z"),
            updatedAt: new Date("2024-10-20T08:15.159Z"),
            name: "John Doe",
            id: "1234567890",
            email: "johndoe@example.com",
            phone: "+1-123-456-7890",
            role: "manager",
        });
    },
);
