import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categoriesData } from '../interfaces/categoriesData.interface';
import { Order } from '../interfaces/order.interface';
import { storeData } from '../interfaces/storeData.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  URL : string | undefined = environment.URL

  
  constructor(private http: HttpClient) {}

  getStoreData(id: string, date?: string): Observable<storeData> {
    let url = `${this.URL}/dashboard/dataByStore/${id}`
    if(date)
      url += `?range=${date}`
    return this.http.get<storeData>(url);
  }
  getCategoriesData(range: string): Observable<categoriesData[]> {
    return this.http.get<categoriesData[]>(`${this.URL}/dashboard/getMoneyByCategoryAndDay?range=${range}`);
  }

}
