import { http, HttpResponse } from "msw";

import { AproveOrderInput } from "../aprove-order";

export const approveOrderMock = http.patch<AproveOrderInput>(
    "/orders/:orderId/approve",
    ({ params }) => {
        if (params.orderId === "error-order-id") {
            return new HttpResponse(null, { status: 400 });
        }
        return new HttpResponse(null, { status: 204 });
    },
);
