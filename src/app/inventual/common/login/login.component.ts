import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private authService:AuthService, private router: Router) { }
  username: string = ""
  password: string = ""
  ngOnInit(): void {
  }

  login(){
    let user  = {
      username: this.username,
      password: this.password
    }
    this.authService.login(user).subscribe(resp => {

      let {role} =  this.getDecodedAccessToken(this.authService.auth.jwt)
      if (role === "ADMIN")         {
        this.router.navigateByUrl('/dashboard')

      }
        
      else{
        this.router.navigateByUrl('/possale')

      }
    }, error => {
      console.log(error);
      
      this.showMessage(error.error.msg,'error', "Error al hacer login, verifica tus datos")

    })
  }

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
