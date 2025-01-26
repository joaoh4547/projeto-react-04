import { api } from "@/lib/axios";

interface CancelOrderInput {
    orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderInput) {
    await api.patch(`/orders/${orderId}/cancel`);
}
