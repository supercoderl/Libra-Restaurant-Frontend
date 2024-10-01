export default interface Dashboard {
    orderCount: number;
    paymentAmount: number;
    customer: {
      customerCountInThisMonth: number;
      customerCountInLastMonth: number;
      percentage: number;
    }
  }
  