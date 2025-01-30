import { api } from "@/lib/axios";

interface UpdateProfileInput {
    name: string;
    description: string | null;
}
export async function updateProfile({ name, description }: UpdateProfileInput) {
    await new Promise((resolve, reject) => {
        setTimeout(reject, 2000);
    });
    await api.put("/profile", {
        name,
        description,
    });
}
