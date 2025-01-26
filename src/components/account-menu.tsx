import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { getProfile } from "@/api/get-profile";
import { signOut } from "@/api/sign-out";

import { StoreProfileDialog } from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
    const navigate = useNavigate();

    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryFn: getProfile,
        queryKey: ["profile"],
        staleTime: Infinity,
    });

    const { data: managedRestaurant, isLoading: isRestaurantLoading } =
        useQuery({
            queryFn: getManagedRestaurant,
            queryKey: ["managed-restaurant"],
            staleTime: Infinity,
        });

    const { mutateAsync: signOutUser, isPending: isSignOutPending } =
        useMutation({
            mutationFn: signOut,
            onSuccess() {
                navigate("/sign-in", {
                    replace: true,
                });
            },
        });

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex select-none items-center gap-2"
                    >
                        {isRestaurantLoading ? (
                            <Skeleton className="h-4 w-40" />
                        ) : (
                            managedRestaurant?.name
                        )}

                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {isProfileLoading ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                        ) : (
                            <>
                                <span>{profile?.name}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.email}
                                </span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="mr-2 h-4 w-4" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem
                        asChild
                        className="text-rose-500 dark:text-rose-400"
                        disabled={isSignOutPending}
                    >
                        <button
                            className="w-full"
                            onClick={() => signOutUser()}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <StoreProfileDialog />
        </Dialog>
    );
}
