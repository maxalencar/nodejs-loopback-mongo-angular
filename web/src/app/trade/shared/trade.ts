export interface Trade {
    id: string;
    product: string;
    orderType: string;
    openingPrice: number;
    openingDateTime: Date;
    closingPrice?: number;
    closingDateTime?: Date;
    currency: string;
    size: number;
    profitLoss?: number; 
}
