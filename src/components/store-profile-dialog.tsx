import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
    getManagedRestaurant,
    GetManagedRestaurantData,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";

import { Button } from "./ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
    const queryClient = useQueryClient();

    const { data: managedRestaurant } = useQuery({
        queryFn: getManagedRestaurant,
        queryKey: ["managed-restaurant"],
        staleTime: Infinity,
    });
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name || "",
            description: managedRestaurant?.description || "",
        },
    });

    function updateManagedRestaurantCache({
        description,
        name,
    }: StoreProfileSchema) {
        const cached = queryClient.getQueryData<GetManagedRestaurantData>([
            "managed-restaurant",
        ]);
        if (cached) {
            queryClient.setQueryData<GetManagedRestaurantData>(
                ["managed-restaurant"],
                {
                    ...cached,
                    description,
                    name,
                },
            );
        }

        return { cached };
    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({ description, name }) {
            const { cached } = updateManagedRestaurantCache({
                description,
                name,
            });

            return { previousProfile: cached };
        },
        onError: (_, __, context) => {
            if (context?.previousProfile) {
                updateManagedRestaurantCache(context.previousProfile);
            }
        },
    });

    async function handleSaveProfile(data: StoreProfileSchema) {
        console.log(data);
        try {
            await updateProfileFn({
                description: data.description,
                name: data.name,
            });
            toast.success("Perfil salvo com sucesso");
        } catch {
            toast.error("Ocorreu um erro ao salvar o perfil");
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao
                    seu cliente
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleSaveProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                            Nome
                        </Label>
                        <Input
                            className="col-span-3"
                            id="name"
                            {...register("name")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">
                            Descrição
                        </Label>
                        <Textarea
                            className="col-span-3 h-40"
                            id="description"
                            {...register("description")}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
