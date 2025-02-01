import { http, HttpResponse } from "msw";

import { CancelOrderInput } from "../cancel-order";

export const cancelOrderMock = http.patch<CancelOrderInput>(
    "/orders/:orderId/cancel",
    ({ params }) => {
        if (params.orderId === "error-order-id") {
            return new HttpResponse(null, { status: 400 });
        }
        return new HttpResponse(null, { status: 204 });
    },
);
