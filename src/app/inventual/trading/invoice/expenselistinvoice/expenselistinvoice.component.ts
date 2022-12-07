import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/inventual/interfaces/order.interface';
import { ClientService } from 'src/app/inventual/services/client.service';
import { OrderService } from 'src/app/inventual/services/order.service';
import { AddpaymentComponent, PaymentTemp } from '../../sale/popup/addpayment/addpayment.component';
import { InvoiceComponent } from '../../sale/popup/invoice/invoice.component';
import { ViewpaymentComponent } from '../../sale/popup/viewpayment/viewpayment.component';

//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-expenselistinvoice',
  templateUrl: './expenselistinvoice.component.html',
  styleUrls: ['./expenselistinvoice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExpenselistinvoiceComponent implements OnInit {


colorStatus : any = {
  "DELAYED": "bg-red",
  "ON_TIME" : "bg-blue",
  "PAYED": "bg-green-light"
}
orders : Order[] = []
displayedColumns: string[] = ['id', 'name', 'status', 'total', 'payed', 'date', 'pagos'];
dataSource = new MatTableDataSource(this.orders);
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
      private orderService: OrderService, private clientService: ClientService, @Inject(MAT_DIALOG_DATA) private data: any,) {
        this.getOrders(data.clientId)
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

getOrders(id: string){
  this.orderService.getOrdersByClient(id).subscribe((resp) => {
    this.orders = resp
    this.dataSource.data = this.orders
  });
}

getClients() {
  this.clientService.getClients().subscribe((resp) => {
    resp.forEach(client =>{
      this.clients.set(client.id,client.name)
    })
  });
}


}
