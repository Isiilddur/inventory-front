import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {tap} from 'rxjs/operators';
import { Auth } from '../interfaces/auth.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.URL
  private _auth: Auth | undefined

  constructor(private http: HttpClient) { }

  get auth(): Auth{
    return {...this._auth!}
  }
  set auth(auth: Auth | undefined){
    this._auth = auth
  }
  login(body:any){
    return this.http.post<Auth>(`${this.URL}/login`, body).pipe(
      tap(auth => {
        this._auth = auth
        localStorage.setItem("jwt", auth.jwt)
      })
    );

  } 
  register(body:any){
    return this.http.post<Auth>(`${this.URL}/register`, body).pipe(
      tap(auth => this._auth = auth)
    );
  } 

  validateToken(body:any){
    const headers : HttpHeaders = new HttpHeaders().set('Authorization', localStorage.getItem('jwt') || "")

    return this.http.get<Auth>(`${this.URL}/renew`).pipe(
      tap(auth => this._auth = auth)
    );

  } 
}
