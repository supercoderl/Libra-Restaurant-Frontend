export interface Reservation {
    reservationId: number;
    tableNumber: number;
    capacity: number;
    status: number;
    storeId: string;
    description?: string | null;
    reservationTime?: Date | null;
    customerName?: string | null;
    customerPhone?: string | null;
    qrCode?: string | null;
    storeName?: string | null;
    orderId?: string | null;
}