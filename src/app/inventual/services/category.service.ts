import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URL : string | undefined = environment.URL

  newCategory: Category = {
    name: '',
    id: undefined,
    active : true
  };
  _stores: Category[] = [];
  constructor(private http: HttpClient) {}

  createCategory(name: string): Observable<Category> {
    console.log(name);
    
    this.newCategory.name = name;
    this.newCategory.id = undefined;
    return this.http.post<Category>(`${this.URL}/category`, this.newCategory);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/categories`);
  }

  deleteCategory (id : string | undefined) : Observable<Category>{
    return this.http.delete<Category>(`${this.URL}/category/${id}`)
 }
}
