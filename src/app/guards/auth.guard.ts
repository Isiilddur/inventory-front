import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { resolve } from 'dns';
import { Auth } from '../inventual/interfaces/auth.interface';
import { AuthService } from '../inventual/services/auth.service';
import jwt_decode from 'jwt-decode';


@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve: any, reject: any) => {
      let jwt = localStorage.getItem('jwt');
      if (jwt) {
        let auth: Auth = {
          jwt: jwt,
          msg: '',
        };
        this.authService.auth = auth;
      }
      if (this.authService.auth.jwt) {
        
        return resolve(true)
      }else{
        this.router.navigateByUrl('/login')
        return resolve(false)
      }
      // else navigate to login
    });
  }
  canActivate(){
    let jwt = localStorage.getItem('jwt');

    if(jwt){
      let {role} =  this.getDecodedAccessToken(jwt)
      return role === "ADMIN"
    }
    return false
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
