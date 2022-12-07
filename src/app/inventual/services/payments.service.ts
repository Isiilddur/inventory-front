import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order.interface';
import { Payment } from '../interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  URL : string | undefined = environment.URL

  
  constructor(private http: HttpClient) {}

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.URL}/payment`, payment);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.URL}/payments`);
  }
  getPaymentsByClient(id : string | undefined): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.URL}/payments/${id}`);
  }

  getPayment(id : string | undefined): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.URL}/payment/${id}`);
  }

  deletePayment (id : string | undefined) : Observable<Payment>{
    return this.http.delete<Payment>(`${this.URL}/payment/${id}`)
 }
}

