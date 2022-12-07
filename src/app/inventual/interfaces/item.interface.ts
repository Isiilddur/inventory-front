import { Product } from "./product.interface";

export interface Item {
    id: string | undefined
    quantity: number
    orderId: string | undefined
    price: number,
    categoryId: string | undefined
}