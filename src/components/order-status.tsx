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
    pending: { color: "bg-slate-400", text: "Pendente" },
    canceled: { color: "bg-rose-400", text: "Cancelado" },
    processing: { color: "bg-amber-400", text: "Em preparo" },
    delivering: { color: "bg-amber-400", text: "Em entrega" },
    delivered: { color: "bg-emerald-400", text: "Entregue" },
};

export function OrderStatus({ status }: OrderStatusProps) {
    return (
        <div className="flex items-center gap-2">
            <span
                data-testid="badge"
                className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
            ></span>
            <span className="font-medium text-muted-foreground">
                {orderStatusMap[status].text}
            </span>
        </div>
    );
}
