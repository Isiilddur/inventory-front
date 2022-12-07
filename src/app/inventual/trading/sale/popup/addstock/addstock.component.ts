import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/inventual/interfaces/payment.interface';
import { Stock } from 'src/app/inventual/interfaces/stock.interface';
import { PaymentsService } from 'src/app/inventual/services/payments.service';
import { ProductService } from 'src/app/inventual/services/product.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';


export interface PaymentTemp{
  idOrder: string
  clientId: string
}
@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddstockComponent implements OnInit {

  newStock : Stock = {
    id: undefined,
    amount: 0,
  }
  amount: number = 0
  ngOnInit(): void {}
  constructor( @Inject(MAT_DIALOG_DATA) private data: any, private productService: ProductService) {
    this.newStock.id = data.idProduct
  }
  addPayment(){
    
    if(this.newStock.amount > 0){
      this.productService.increaseStock(this.newStock).subscribe(
        resp => {
          this.showMessage("Stock exitoso", "success")
      }, err =>{
        this.showMessage("Error", "error", "La actualización de stock tuvo problemas.!")
      })
    }else{
      this.showMessage("Error", "error", "No puedes reducir stock!")

    }
    

  }

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }

}
