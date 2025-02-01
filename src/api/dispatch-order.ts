import { api } from "@/lib/axios";

export interface DispatchOrderInput {
    orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderInput) {
    await api.patch(`/orders/${orderId}/dispatch`);
}
