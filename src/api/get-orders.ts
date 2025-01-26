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
}

export async function getOrders({ pageIndex }: GetOrderInput) {
    const response = await api.get<GetOrdersData>("/orders", {
        params: {
            pageIndex,
        },
    });
    return response.data;
}
