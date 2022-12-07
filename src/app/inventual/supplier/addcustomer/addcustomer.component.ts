import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddcustomerComponent implements OnInit {
//sidebar menu activation start
menuSidebarActive:boolean=false;
myfunction(){
  if(this.menuSidebarActive==false){
    this.menuSidebarActive=true;
  }
  else {
    this.menuSidebarActive=false;
  }
}
//sidebar menu activation end
  newClient: Client = {
    id: undefined,
    name: '',
    rfc: undefined,
    phone: undefined,
    address: undefined
  }
  constructor(private clientService: ClientService) { }

  createClient(){
    if(this.validateNewClient()){
      this.clientService.createClient(this.newClient).subscribe(
        resp => {
          this.showMessage("Cliente creado correctamente", "success", "")
          this.resetAll()
        }, 
        err => {
          this.showMessage("Error al crear cliente", "error", err.errors.msg)
        })
    }else this.showMessage("Error al crear cliente", "error", "Algun campo es incorrecto")
  }

  validateNewClient(){
    return this.newClient.name != undefined && this.newClient.name != '';
  }
  ngOnInit(): void {}

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }

  resetAll(){
    this.newClient = {
      id: undefined,
      name: '',
      rfc: undefined,
      phone: undefined,
      address: undefined
    }
  }

}
