import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { environment } from '../../../environments/environment';
import { ClientStatus } from '../interfaces/clientstatus.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL : string | undefined = environment.URL

  
  constructor(private http: HttpClient) {}

  createOrder(product: Order): Observable<Order> {
    return this.http.post<Order>(`${this.URL}/order`, product);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/orders`);
  }

  getOrdersByClient(id:string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL}/orders/client/${id}`);
  }


  deleteOrder (id : string | undefined) : Observable<Order>{
    return this.http.delete<Order>(`${this.URL}/order/${id}`)
 }
 getClientsStatus(): Observable<ClientStatus[]>{
  return this.http.get<ClientStatus[]>(`${this.URL}/orders/clients/status`)
}
}
