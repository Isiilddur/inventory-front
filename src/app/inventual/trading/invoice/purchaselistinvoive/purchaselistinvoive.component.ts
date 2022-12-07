import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/inventual/interfaces/order.interface';
import { Payment } from 'src/app/inventual/interfaces/payment.interface';
import { ClientService } from 'src/app/inventual/services/client.service';
import { OrderService } from 'src/app/inventual/services/order.service';
import { PaymentsService } from 'src/app/inventual/services/payments.service';
import { InvoiceComponent } from '../../sale/popup/invoice/invoice.component';
import { ViewpaymentComponent } from '../../sale/popup/viewpayment/viewpayment.component';
import { ExpenselistinvoiceComponent } from '../expenselistinvoice/expenselistinvoice.component';

@Component({
  selector: 'app-purchaselistinvoive',
  templateUrl: './purchaselistinvoive.component.html',
  styleUrls: ['./purchaselistinvoive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchaselistinvoiveComponent implements OnInit {
  
  payments : Payment[] = []
  displayedColumns: string[] = ['id', 'amount', 'orderId', 'date'];
  dataSource = new MatTableDataSource(this.payments);
  clients : Map<string | undefined, string> = new Map()
  //checkbox end
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
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
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  constructor(private _liveAnnouncer: LiveAnnouncer,private dialog: MatDialog,
        private paymentsService: PaymentsService, private clientService: ClientService, @Inject(MAT_DIALOG_DATA) private data: any,) {
          this.getPayments(data.clientId)
        }
  @ViewChild(MatSort)
  sort!: MatSort | null;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addPayment(id: string, clientId: string) {
    this.dialog.open(ExpenselistinvoiceComponent, {data: {clientId:clientId}});
  }
  
  viewPayment() {
    this.dialog.open(ViewpaymentComponent);
  }
  
  invoice() {
    this.dialog.open(InvoiceComponent);
  }
  
  ngOnInit(): void {}
  
  getPayments(id: string){
    this.paymentsService.getPaymentsByClient(id).subscribe((resp) => {
      this.payments = resp
      this.dataSource.data = this.payments
    });
  }
  
  
}
