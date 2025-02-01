import { api } from "@/lib/axios";

export interface CancelOrderInput {
    orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderInput) {
    await api.patch(`/orders/${orderId}/cancel`);
}
