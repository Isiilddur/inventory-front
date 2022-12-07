import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../../interfaces/store.interface';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private URL: string = "http://localhost:8080/api/v1"
  constructor(private http: HttpClient) { }

  getRequest(endpoint: string) : Observable<Store[]>{
    return this.http.get<Store[]>(this.URL+endpoint)
  }

  postRequest(endpoint: string, body: object){
    this.http.post(this.URL+endpoint,body).subscribe((resp:any) => {
      
      
    })
  }
}
