import { Product } from "./product.interface";

export interface ProductOnOrder {
    productId: string;
    orderId: string;
    categoryId: string;
    date: Date;
    quantity: string;
    price: string;
    product: Product;
}