import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';
import { ExpenselistinvoiceComponent } from '../../trading/invoice/expenselistinvoice/expenselistinvoice.component';
import { PurchaselistinvoiveComponent } from '../../trading/invoice/purchaselistinvoive/purchaselistinvoive.component';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerlistComponent implements OnInit {
  //checkbox start
  clients: Client[] = []
  clientStatusMap: Map<string | undefined, any> = new Map()
  menuSidebarActive: boolean = false;
  myfunction() {
    if (this.menuSidebarActive == false) {
      this.menuSidebarActive = true;
    } else {
      this.menuSidebarActive = false;
    }
  }
  //sidebar menu activation end

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private clientService: ClientService
  ) {
    this.getClients()
    this.getClientStatus()
  }

  getClients() {
    this.clientService.getClients().subscribe((resp) => {
      this.clients = resp
    });
  }
  getClientStatus() {
      this.orderService.getClientsStatus().subscribe(resp => {
        for (const clientStatus of resp) {
          this.clientStatusMap.set(clientStatus.clientId, clientStatus)
        }
      })
    
  }

  openDialogTwo(id: string | undefined) {
    this.dialog.open(ExpenselistinvoiceComponent, {  width:'50%',data: {clientId:id}});
  }
  openDialogOne(id: string | undefined) {
    this.dialog.open(PurchaselistinvoiveComponent, {  width:'50%',data: {clientId:id}});
  }
  ngOnInit(): void {}
}
