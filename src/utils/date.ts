export function formatDate(date: Date) {

    // Mảng các ngày trong tuần và các tháng
    const daysOfWeek = [
        "Chủ Nhật", "Thứ Hai", "Thứ Ba",
        "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
    ];
    const monthsOfYear = [
        "1", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "11", "12"
    ];

    // Lấy các thành phần của ngày
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    // Định dạng thành chuỗi
    return `${dayOfWeek}, ngày ${day} tháng ${month} năm ${year}`;
}

export function generateOrderNo(tableNumber: number) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const orderNo = `${day}${month}${year}${hours}${minutes}${seconds}${String(tableNumber).padStart(2, '0')}`;

    return orderNo;
}