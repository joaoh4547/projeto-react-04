import { api } from "@/lib/axios";

export interface GetOrderDetailsInput {
    orderId: string;
}

export interface GetOrderDetailsData {
    id: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    totalInCents: number;
    customer: {
        name: string;
        email: string;
        phone: string | null;
    };
    orderItems: {
        id: string;
        priceInCents: number;
        quantity: number;
        product: {
            name: string;
        };
    }[];
}

export async function getOrderDetails({ orderId }: GetOrderDetailsInput) {
    const response = await api.get<GetOrderDetailsData>(`/orders/${orderId}`);
    return response.data;
}
