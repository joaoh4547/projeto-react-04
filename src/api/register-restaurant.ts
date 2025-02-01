import { api } from "@/lib/axios";

export interface RegisterRestaurantInput {
    restaurantName: string;
    managerName: string;
    email: string;
    phone: string;
}

export async function registerRestaurant({
    email,
    managerName,
    phone,
    restaurantName,
}: RegisterRestaurantInput) {
    await api.post("/restaurants", {
        email,
        managerName,
        phone,
        restaurantName,
    });
}
