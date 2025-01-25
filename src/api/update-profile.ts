import { api } from "@/lib/axios";

interface UpdateProfileInput {
    name: string;
    description: string | null;
}
export async function updateProfile({ name, description }: UpdateProfileInput) {
    await new Promise((resolve, reject) => {
        setTimeout(reject, 1000);
    });

    throw new Error("updateProfile");
    await api.put("/profile", {
        name,
        description,
    });
}
