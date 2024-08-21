import { OrderStatus, OrderStatusText } from "@/enums"

export const getOrderStatus = (value: number) => {
    return {
        title: OrderStatusText[value as keyof typeof OrderStatusText],
        color: getOrderStatusColor(value)
    };
}

const getOrderStatusColor = (value: number) => {
    switch(value)
    {
        case OrderStatus.Draft:
            return "#d4380d";
        case OrderStatus.Confirmed:
            return "#d4b106";
        case OrderStatus.InPreperation:
            return "#7cb305";
        case OrderStatus.Ready:
            return "#08979c";
        case OrderStatus.Completed:
            return "#0958d9";
        case OrderStatus.Canceled:
            return "#c41d7f";
        case OrderStatus.Delayed:
            return "#135200";
        case OrderStatus.Paid:
            return "#ad6800";
        case OrderStatus.Failed:
            return "#ad4e00";
        case OrderStatus.Refunded:
            return "#061178";
    }
    return "danger";
}