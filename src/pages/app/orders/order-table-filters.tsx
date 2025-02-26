import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.enum([
        "all",
        "pending",
        "canceled",
        "processing",
        "delivering",
        "delivered",
    ]),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const orderId = searchParams.get("orderId");
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status") as
        | OrderFiltersSchema["status"]
        | null;

    const { register, handleSubmit, control, reset } =
        useForm<OrderFiltersSchema>({
            resolver: zodResolver(orderFiltersSchema),
            defaultValues: {
                status: status || "all",
                orderId: orderId || "",
                customerName: customerName || "",
            },
        });

    function handleFilter({
        status,
        customerName,
        orderId,
    }: OrderFiltersSchema) {
        setSearchParams((state) => {
            if (orderId) {
                state.set("orderId", orderId);
            } else {
                state.delete("orderId");
            }

            if (customerName) {
                state.set("customerName", customerName);
            } else {
                state.delete("customerName");
            }
            state.set("status", status);
            state.set("page", "1");
            return state;
        });
    }

    function handleClearFilters() {
        setSearchParams((state) => {
            state.delete("orderId");
            state.delete("customerName");
            state.delete("status");
            state.set("page", "1");
            return state;
        });
        reset();
    }

    return (
        <form
            className="flex items-center gap-2"
            onSubmit={handleSubmit(handleFilter)}
        >
            <span className="text-sm font-semibold">Filtros</span>
            <Input
                placeholder="ID do pedido"
                className="h-8 w-auto"
                {...register("orderId")}
            />

            <Input
                placeholder="Nome do cliente"
                className="h-8 w-[320px]"
                {...register("customerName")}
            />

            <Controller
                control={control}
                name="status"
                render={({ field: { name, onChange, value, disabled } }) => (
                    <Select
                        defaultValue="all"
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                    >
                        <SelectTrigger className="h-8 w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos Status</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="canceled">Cancelado</SelectItem>
                            <SelectItem value="processing">
                                Em preparo
                            </SelectItem>
                            <SelectItem value="delivering">
                                Em entrega
                            </SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />

            <Button type="submit" variant="secondary" size="xs">
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>
            <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleClearFilters}
            >
                <X className="mr-2 h-4 w-4" />
                Remover filtros
            </Button>
        </form>
    );
}
