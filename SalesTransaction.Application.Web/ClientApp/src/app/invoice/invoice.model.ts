// export interface MvInvoice {
//     InvoiceId: number;
//     CustomerName: string;
//     ProductName: string;
//     Rate : number;
//     SubTotal: number;
//     Discount: number;
//     Total: number;
//     Quantity: number;    
//    // CustomerId: number;
//    // transactionCount: number;
// }

export interface MvInvoice {
    invoiceId: number;
    customerId: number;
    customerName: string;
    subTotal: number;
    Total: number;
    insertDate: Date;
  }
  
  export interface MvInvoiceDetail {
    salesTransactionId: number;
    productName: string;
    quantity: number;
    rate: number;
    totalAmount: number;
    invoiceId: number;
  }