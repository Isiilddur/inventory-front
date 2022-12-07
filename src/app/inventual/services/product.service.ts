import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Unit } from '../enums/unit.enum';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Stock } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL : string | undefined = environment.URL

  
  _products: Product[] = [];
  constructor(private http: HttpClient) {}

  increaseStock(stock: Stock): Observable<Product>{
    return this.http.post<Product>(`${this.URL}/product/stock/${stock.id}`, stock)
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.URL}/product`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products`);
  }

  deleteProduct (id : string | undefined) : Observable<Product>{
    return this.http.delete<Product>(`${this.URL}/product/${id}`)
 }
}
