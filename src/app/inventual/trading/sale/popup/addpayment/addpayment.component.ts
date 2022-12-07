import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/inventual/interfaces/payment.interface';
import { PaymentsService } from 'src/app/inventual/services/payments.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import ConectorPluginV3 from 'src/app/inventual/services/printer.service'

export interface PaymentTemp{
  idOrder: string
  clientId: string
}
@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddpaymentComponent implements OnInit {

  newPayment : Payment = {
    id: undefined,
    amount: 0,
    orderId: '',
    date: new Date(),
    clientId: ''
  }
  amount: number = 0
  ngOnInit(): void {}
  constructor( @Inject(MAT_DIALOG_DATA) private data: PaymentTemp, private paymentService: PaymentsService) {
  }
  addPayment(){
    this.newPayment.orderId = this.data.idOrder
    this.newPayment.clientId = this.data.clientId
  
      this.paymentService.createPayment(this.newPayment).subscribe(
        resp => {
          this.showMessage("Pago exitoso", "success")
      }, err =>{
        this.showMessage("Error", "error", "El pago no fue registrado correctamente")
      })
  
    

  }

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }

}
