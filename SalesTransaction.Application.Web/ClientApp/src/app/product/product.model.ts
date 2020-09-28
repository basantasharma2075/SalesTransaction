export interface MvProduct {
    ProductId: number;
    ProductName: string;
    ProductQuantity: number;
    RemainingQuantity: number;
    ProductExpiryDate: Date;
    ProductBarCode: string;
    ProductRate: number;
    StartDate: Date;
    EndDate: Date;
    ProductOffer: number;

}

export interface MvNewProduct {
    ProductName: string;
    ProductQuantity: number;
    RemainingQuantity: number;
    ProductExpiryDate: Date;
    ProductBarCode: string;
    ProductRate: number;
    StartDate: Date;
    EndDate: Date;
    ProductOffer: number;

}