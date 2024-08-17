export const Status = {
    Available: 0,
    Reserved: 1,
    Occupied: 2,
    Cleaning: 3,
    OutOfService: 4,
    0: 'Có sẵn',
    1: 'Đã đặt trước',
    2: 'Đang phục vụ',
    3: 'Đang dọn dẹp',
    4: 'Không phục vụ'
};

export const OrderStatus = {
    Draft: 0,
    Confirmed: 1,
    InPreperation: 2,
    Ready: 3,
    Completed: 4,
    Canceled: 5,
    Delayed: 6, 
    Paid: 7,
    Failed: 8,
    Refunded: 9
}

export const CustomerLikeStatus = {
    NotSet: 0,
    Liked: 1,
    Disliked: 2
}