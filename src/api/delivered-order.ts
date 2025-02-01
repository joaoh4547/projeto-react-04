import { api } from "@/lib/axios";

export interface DeliveredOrderInput {
    orderId: string;
}

export async function deliveredOrder({ orderId }: DeliveredOrderInput) {
    await api.patch(`/orders/${orderId}/deliver`);
}
