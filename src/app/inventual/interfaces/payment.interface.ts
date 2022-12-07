export interface Payment{
    id: string | undefined;
    amount: number
    orderId: string;
    date: Date;
    clientId: string
}


