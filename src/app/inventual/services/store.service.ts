import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http/http.service';
import { Store } from '../interfaces/store.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  URL : string | undefined = environment.URL

  newStore: Store = {
    name: '',
    id: undefined,
  };
  _stores: Store[] = [];

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.URL}/stores`);
  }
  createStore(name: string): Observable<Store> {
    this.newStore.name = name;
    this.newStore.id = undefined;
    return this.http.post<Store>(`${this.URL}/store`, this.newStore);
  }
  deleteStore(id: string | undefined): Observable<Store> {
    return this.http.delete<Store>(`${this.URL}/store/${id}`);
  }
}
