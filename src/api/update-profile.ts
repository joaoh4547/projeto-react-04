import { api } from "@/lib/axios";

export interface UpdateProfileInput {
    name: string;
    description: string | null;
}
export async function updateProfile({ name, description }: UpdateProfileInput) {
    await api.put("/profile", {
        name,
        description,
    });
}
