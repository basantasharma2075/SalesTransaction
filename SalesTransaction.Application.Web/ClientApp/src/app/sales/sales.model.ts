export interface MvSales {
    SalesTransactionId: number;
    CustomerId: number;
    ProductId: number;
    InvoiceId: number;
    CustomerName: string;
    ProductName: string;
	Quantity: number; 
    Rate: number;
    SubTotal: number;
    Discount: number;
    Total: number;

}

// export interface MvNewSales {
//     CustomerId: number;
//     ProductId: number;

// }