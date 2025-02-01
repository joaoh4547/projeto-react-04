import { api } from "@/lib/axios";

export interface AproveOrderInput {
    orderId: string;
}

export async function aproveOrder({ orderId }: AproveOrderInput) {
    await api.patch(`/orders/${orderId}/approve`);
}
