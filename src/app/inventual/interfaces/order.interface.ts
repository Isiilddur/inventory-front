import { HttpStatusCode } from "@angular/common/http";
import { Item } from "./item.interface";
import { Status } from "../enums/status.enum";
import { Payment } from "./payment.interface";
 
export interface Order {
    id: string | undefined;
    clientId: string | any
    products : Item[]
    total: number
    status: Status
    date: Date
    payments: Payment[] | undefined;
    storeId: string
    payed: number
}