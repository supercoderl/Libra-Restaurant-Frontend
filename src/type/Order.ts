export interface Order {
    orderId?: string | null;
    orderNo: string;
    storeId: string;
    paymentMethodId?: number | null;
    paymentTimeId?: number | null;
    servantId?: string | null;
    cashierId?: string | null;
    customerNotes?: string | null;
    reservationId: number;
    priceCalculated: number;
    priceAdjustment?: number | null;
    priceAdjustmentReason?: string | null;
    subtotal: number;
    tax: number;
    total: number;
    latestStatus: number;
    latestStatusUpdate: Date;
    isPaid: boolean;
    isPreparationDelayed: boolean;
    delayedTime?: Date | null;
    isCanceled: boolean;
    canceledTime?: Date | null;
    canceledReason?: string | null;
    isReady: boolean;
    readyTime?: Date | null;
    isCompleted: boolean;
    completedTime?: Date | null;
}