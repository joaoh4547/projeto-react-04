import { http, HttpResponse } from "msw";

import { DispatchOrderInput } from "../dispatch-order";

export const dispatchOrderMock = http.patch<DispatchOrderInput>(
    "/orders/:orderId/dispatch",
    ({ params }) => {
        if (params.orderId === "error-order-id") {
            return new HttpResponse(null, { status: 400 });
        }
        return new HttpResponse(null, { status: 204 });
    },
);
