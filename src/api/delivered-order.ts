import { api } from "@/lib/axios";

interface DeliveredOrderInput {
    orderId: string;
}

export async function deliveredOrder({ orderId }: DeliveredOrderInput) {
    await api.patch(`/orders/${orderId}/deliver`);
}
