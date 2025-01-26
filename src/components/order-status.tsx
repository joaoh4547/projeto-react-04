type Status =
    | "pending"
    | "canceled"
    | "processing"
    | "delivering"
    | "delivered";

interface OrderStatusProps {
    status: Status;
}

const orderStatusMap: Record<Status, { color: string; text: string }> = {
    pending: { color: "slate", text: "Pendente" },
    canceled: { color: "rose", text: "Cancelado" },
    processing: { color: "amber", text: "Em preparo" },
    delivering: { color: "amber", text: "Em entrega" },
    delivered: { color: "emerald", text: "Entregue" },
};

export function OrderStatus({ status }: OrderStatusProps) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={`h-2 w-2 rounded-full bg-${orderStatusMap[status].color}-400`}
            ></span>
            <span className="font-medium text-muted-foreground">
                {orderStatusMap[status].text}
            </span>
        </div>
    );
}
