import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client.interface'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  URL : string | undefined = environment.URL

  
  constructor(private http: HttpClient) {}

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.URL}/client`, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.URL}/clients`);
  }

  deleteClient (id : string | undefined) : Observable<Client>{
    return this.http.delete<Client>(`${this.URL}/client/${id}`)
 }
}
