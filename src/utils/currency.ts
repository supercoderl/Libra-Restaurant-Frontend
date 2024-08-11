export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN') + ' ₫';
}