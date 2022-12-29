import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/inventual/interfaces/payment.interface';
import { PaymentsService } from 'src/app/inventual/services/payments.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import ConectorPluginV3 from 'src/app/inventual/services/printer.service'
import { ProductService } from 'src/app/inventual/services/product.service';

export interface PaymentTemp{
  idOrder: string
  clientId: string
  total: number
}
@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddpaymentComponent implements OnInit {

  impresoraSeleccionada: string = "POS58 Printer";

  newPayment : Payment = {
    id: undefined,
    amount: 0,
    orderId: '',
    date: new Date(),
    clientId: ''
  }
  amount: number = 0
  ngOnInit(): void {}
  constructor( @Inject(MAT_DIALOG_DATA) private data: PaymentTemp, private paymentService: PaymentsService, private productServie: ProductService) {
  }

  async testImpresion(){
    this.buildMessage()
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
   
    this.testImpresion()

  }

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }

  buildMessage(){
    const conector = new ConectorPluginV3();
    conector
      .Iniciar()
      .Feed(1)
      .DescargarImagenDeInternetEImprimir("https://inventual.s3.amazonaws.com/avicola2.jpeg",ConectorPluginV3.TAMAÑO_IMAGEN_DOBLE_ALTO, 400)
      .Iniciar()
      .Feed(1)
      .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
      
      .EscribirTexto(' \n')
        .EscribirTexto("AVICOLA FLOZAR S.A. DE C.V.\nRFC: AFL140124EU2\n")
        .EscribirTexto("Heroes de 1810 No.25\nCol. Tacubaya CP 11870. \nMiguel Hidalgo, CDMX.\nTel: 55226144637 \nCel:5548220090 / 5587970574.\navicola.flozar_ceci79@hotmail.com.\n")

        .EscribirTexto(this.data.idOrder + '\n')

        .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)

        .EscribirTexto("____________________\n")
        .EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-MX").format(new Date())))
        .Feed(1)
        .EscribirTexto("Cliente: " + this.data.clientId)
        .Feed(1)

     this.productServie.getProductsOnOrder(this.data.idOrder).subscribe(res =>{
      console.log(res);
      
      res.forEach(product => {
        conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_IZQUIERDA)
        conector.EscribirTexto(product.product.name.concat('('+ (Math.round(parseFloat(product.quantity) * 100) / 100).toFixed(2) + 'Kg)\n'))
        conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_DERECHA)
        conector.EscribirTexto('$' + (Math.round(parseFloat(product.price) * 100) / 100).toFixed(2)+'\n' )

      })
      conector.EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
        .EscribirTexto("____________________\n")
        .EscribirTexto('TOTAL: $'+(Math.round(this.data.total * 100) / 100).toFixed(2))
        .EscribirTexto("\n____________________\n")
        .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
        .EstablecerEnfatizado(true)
        .EstablecerTamañoFuente(1, 1)
        .EscribirTexto('Pagado: $'+this.newPayment.amount)
        
      conector.imprimirEn(this.impresoraSeleccionada);

    })
    
  }

}
