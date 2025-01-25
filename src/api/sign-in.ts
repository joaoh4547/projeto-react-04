import { api } from "@/lib/axios";

export interface SignInInput {
    email: string;
}

export async function signIn({ email }: SignInInput) {
    await api.post("/authenticate", { email });
}
