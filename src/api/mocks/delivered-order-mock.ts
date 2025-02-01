import { http, HttpResponse } from "msw";

import { DeliveredOrderInput } from "../delivered-order";

export const deliveredOrderMock = http.patch<DeliveredOrderInput>(
    "/orders/:orderId/deliver",
    ({ params }) => {
        if (params.orderId === "error-order-id") {
            return new HttpResponse(null, { status: 400 });
        }
        return new HttpResponse(null, { status: 204 });
    },
);
