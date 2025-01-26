import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";

import { aproveOrder } from "@/api/aprove-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliveredOrder } from "@/api/delivered-order";
import { dispatchOrder } from "@/api/dispatch-order";
import { GetOrdersData } from "@/api/get-orders";
import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { OrderDetails } from "./order-details";

interface OrderTableRowProps {
    order: {
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
    };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    const allowCancelStatus = ["processing", "pending"];

    const cancelDisabled = !allowCancelStatus.includes(order.status);

    const queryClient = useQueryClient();

    function updateOrderStatusCache(
        orderId: string,
        status:
            | "pending"
            | "canceled"
            | "processing"
            | "delivering"
            | "delivered",
    ) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersData>({
            queryKey: ["orders"],
        });
        ordersListCache.forEach(([key, data]) => {
            if (data) {
                queryClient.setQueryData<GetOrdersData>(key, {
                    ...data,
                    orders: data.orders.map((order) => {
                        if (order.orderId === orderId) {
                            return { ...order, status };
                        }
                        return order;
                    }),
                });
            }
        });
    }

    const { mutateAsync: cancelOrderFn, isPending: isCancelPending } =
        useMutation({
            mutationFn: cancelOrder,
            async onSuccess(_, { orderId }) {
                updateOrderStatusCache(orderId, "canceled");
            },
        });

    const { mutateAsync: aproveOrderFn, isPending: isAprovePending } =
        useMutation({
            mutationFn: aproveOrder,
            async onSuccess(_, { orderId }) {
                updateOrderStatusCache(orderId, "processing");
            },
        });

    const { mutateAsync: dispatchOrderFn, isPending: isDispatchPending } =
        useMutation({
            mutationFn: dispatchOrder,
            async onSuccess(_, { orderId }) {
                updateOrderStatusCache(orderId, "delivering");
            },
        });

    const { mutateAsync: deliveredOrderFn, isPending: isDeliveredPending } =
        useMutation({
            mutationFn: deliveredOrder,
            async onSuccess(_, { orderId }) {
                updateOrderStatusCache(orderId, "delivered");
            },
        });

    async function handleCancelProfile() {
        await cancelOrderFn({ orderId: order.orderId });
    }

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails
                        orderId={order.orderId}
                        opened={isDetailsOpen}
                    />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                })}
            </TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </TableCell>
            <TableCell>
                {order.status === "pending" && (
                    <Button
                        disabled={isAprovePending}
                        onClick={() =>
                            aproveOrderFn({ orderId: order.orderId })
                        }
                        variant="outline"
                        size="xs"
                    >
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Aprovar
                    </Button>
                )}
                {order.status === "processing" && (
                    <Button
                        disabled={isDispatchPending}
                        onClick={() =>
                            dispatchOrderFn({ orderId: order.orderId })
                        }
                        variant="outline"
                        size="xs"
                    >
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Em Entrega
                    </Button>
                )}
                {order.status === "delivering" && (
                    <Button
                        disabled={isDeliveredPending}
                        onClick={() =>
                            deliveredOrderFn({ orderId: order.orderId })
                        }
                        variant="outline"
                        size="xs"
                    >
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Entregue
                    </Button>
                )}
            </TableCell>
            <TableCell>
                <Button
                    disabled={cancelDisabled || isCancelPending}
                    onClick={handleCancelProfile}
                    variant="ghost"
                    size="xs"
                >
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    );
}
