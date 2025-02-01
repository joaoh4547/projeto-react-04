import { api } from "@/lib/axios";

export interface GetProfileData {
    name: string;
    id: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getProfile() {
    const response = await api.get<GetProfileData>("/me");

    return response.data;
}
