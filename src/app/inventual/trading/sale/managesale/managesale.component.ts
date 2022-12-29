import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AddpaymentComponent } from '../popup/addpayment/addpayment.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewpaymentComponent } from '../popup/viewpayment/viewpayment.component';
import { InvoiceComponent } from '../popup/invoice/invoice.component';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Status } from 'src/app/inventual/enums/status.enum';
import { Order } from 'src/app/inventual/interfaces/order.interface';
import { OrderService } from 'src/app/inventual/services/order.service';
import { ClientService } from 'src/app/inventual/services/client.service';
import { Client } from 'src/app/inventual/interfaces/client.interface';
import { Store } from 'src/app/inventual/interfaces/store.interface';
import { StoreService } from 'src/app/inventual/services/store.service';


//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-managesale',
  templateUrl: './managesale.component.html',
  styleUrls: ['./managesale.component.scss'],
})
export class ManagesaleComponent implements OnInit,AfterViewInit {
  //checkbox start
  colorStatus : any = {
    "DELAYED": "bg-red",
    "ON_TIME" : "bg-blue",
    "PAYED": "bg-green-light"
  }
  orders : Order[] = []
  stores: Map<string | undefined, string> = new Map()
  displayedColumns: string[] = ['storeId', 'name', 'status', 'total', 'payed', 'date', 'pagos'];
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
        private orderService: OrderService, private clientService: ClientService,
        private storeService: StoreService) {
          this.getOrders()
          this.getClients()
          this.getStores()
          
        }
  @ViewChild(MatSort)
  sort!: MatSort | null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }
  applyFilter(filterValue: any) {
    
    filterValue = filterValue?.target?.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(filterValue);

    this.dataSource.filter = filterValue;
    console.log(this.clients);

    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      console.log(this.clients.get(data.clientId), filter);
      
      return this.clients.get(data.clientId)!.toLowerCase().trim().includes( filter) ;
     };
  }
  addPayment(id: string, clientId: string, total: number) {
    console.log(this.clients);
    
    this.dialog.open(AddpaymentComponent, {data: {idOrder:id,clientId:clientId, total:total}});
  }

  viewPayment() {
    this.dialog.open(ViewpaymentComponent);
  }

  invoice() {
    this.dialog.open(InvoiceComponent);
  }

  ngOnInit(): void {
    
    
  }

  getOrders(){
    this.orderService.getOrders().subscribe((resp) => {
      this.orders = resp
      this.dataSource.data = this.orders
    });
  }

  getStores(){
    this.storeService.getStores().subscribe((resp) => {
      resp.forEach(store => {
        this.stores.set(store.id, store.name)
      })
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
