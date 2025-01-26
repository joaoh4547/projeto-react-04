import { api } from "@/lib/axios";

interface GetOrdersData {
    orders: {
        orderId: string;
        createdAt: Date;
        status:
            | "pending"
            | "canceled"
            | "processing"
            | "delivering"
            | "delivered";
        customerName: string;
        total: number;
    }[];
    meta: {
        pageIndex: number;
        perPage: number;
        totalCount: number;
    };
}

interface GetOrderInput {
    pageIndex?: number | null;
    orderId?: string | null;
    customerName?: string | null;
    status?:
        | "pending"
        | "canceled"
        | "processing"
        | "delivering"
        | "delivered"
        | null;
}

export async function getOrders({
    pageIndex,
    status,
    orderId,
    customerName,
}: GetOrderInput) {
    const response = await api.get<GetOrdersData>("/orders", {
        params: {
            pageIndex,
            orderId,
            customerName,
            status,
        },
    });
    return response.data;
}
