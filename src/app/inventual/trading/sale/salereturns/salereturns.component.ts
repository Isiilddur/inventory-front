import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Status } from 'src/app/inventual/enums/status.enum';
import { Item } from 'src/app/inventual/interfaces/item.interface';
import { Order } from 'src/app/inventual/interfaces/order.interface';
import { Product } from 'src/app/inventual/interfaces/product.interface';
import { CategoryService } from 'src/app/inventual/services/category.service';
import { ClientService } from 'src/app/inventual/services/client.service';
import { OrderService } from 'src/app/inventual/services/order.service';
import { ProductService } from 'src/app/inventual/services/product.service';
import { StoreService } from 'src/app/inventual/services/store.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { MakepaymentComponent } from '../popup/makepayment/makepayment.component';
import { OrderdiscountComponent } from '../popup/orderdiscount/orderdiscount.component';
import { QuickaddcustomerComponent } from '../popup/quickaddcustomer/quickaddcustomer.component';

//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-salereturns',
  templateUrl: './salereturns.component.html',
  styleUrls: ['./salereturns.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalereturnsComponent implements OnInit {

  @Output() clientSelected = new EventEmitter<{ name: string}>();
  
  myControl!: FormGroup;

  initForm(){
    this.myControl = this.fb.group({
      'client':['']
    })
    this.myControl.get('client')?.valueChanges.subscribe(response =>{
      this._filter(response)
    })
  }

  filteredOptions: any[] | undefined;

  clients : any[] = []
  newSale : any = {}
  stores: Map<string | undefined,string> = new Map()
  categories : Map<string | undefined,string> = new Map()
  products: Product[] = [];
  productsFiltered: Product[] | undefined
  newProducts: Product[]=[]
  newItems: Item[] = []
  newOrder: Order = {
    id: undefined,
    clientId: '',
    products: [],
    total: 0,
    status: Status.ON_TIME,
    date: new Date(),
    payments: undefined,
    storeId: '',
    payed: 0
  }

  constructor(public dialog: MatDialog,private fb: FormBuilder, private productService: ProductService,
    private categoryService: CategoryService,
    private storeService: StoreService, private orderService: OrderService, private clientService: ClientService) {
      this.getCategories()
      this.getStores()
      this.getProducts()
      this.getClients()
      console.log("asda");
      
    }

  sendTheNewValue(client: any){
   
  console.log(client);
  
    this.clientSelected.emit({name:client.option.value})
  }
  openDialog() {
    const dialogRef = this.dialog.open(OrderdiscountComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogTwo() {
    this.dialog.open(QuickaddcustomerComponent);
  }

  makePayment() {
    this.dialog.open(MakepaymentComponent);
  }

  ngOnInit(): void {
    this.initForm()
  }
  

   _filter(value: string) {
    console.log(value);
    
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    
    
    this.filteredOptions = this.clients.filter(client => {
      console.log(client);
      
      return client.name.toLowerCase().includes(filterValue)}
    );
          
      
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((resp) => {
      resp.forEach(category =>{
        this.categories.set(category.id,category.name)
      })
    });
  }

  getStores() {
    this.storeService.getStores().subscribe((resp) => {
      resp.forEach(store =>{
        this.stores.set(store.id,store.name)
      })
    });
  }
  
  getProducts() {
    this.productService.getProducts().subscribe((resp) => {
      this.products = resp
    });
  }

  getClients() {
    this.clientService.getClients().subscribe((resp) => {
      this.clients = resp
    });
  }
  
  removeItem(index: any){
    let item = this.newItems[index]
    this.newItems.splice(index, 1); // 2nd parameter means remove one item only
    this.newProducts.splice(index,1)
    document.getElementById(item.id!)?.classList.remove("hidden")

    
  }

  filterProducs(id: string){
    this.productsFiltered = this.products.filter(product => {
      
      return product.storeId == id}
      );
  }

  async addProduct(product:Product){
    let newItem : Item = {
      id: product.id,
      quantity: 1,
      orderId: undefined,
      price: 0,
      categoryId: product.categoryId
    }
   
    
      this.newProducts.push(product);
      this.newItems.push(newItem)
      document.getElementById(product.id!)?.classList.add("hidden")
    
  }
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

  //counter
  count=0
  counts=0
  counter(type:string,) {
    type==="add" ?this.count++:this.count--;
  }
  countery(type:string, index: number) {
    let item = this.newItems[index]
    type==="add" ?item.quantity++:item.quantity--;
    this.newItems[index] = item;
  }

  getTotal(){
    let total = 0.0;
    for(let item in this.newItems){
      total += this.newItems[item].quantity * this.newItems[item].price

    }
    return total;

  }

  sendOrder(){
    this.newOrder.total = this.getTotal()
    this.confirmCreateOrder()
  }
  resetAll(){

  }

  confirmCreateOrder(){
    Swal.fire({
      title: 'Estás seguro de crear esta orden?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendCreateOrder()

      }
    })
  }

  sendCreateOrder(){
    console.log(this.myControl.get('client'));
    
    this.newOrder.products = this.newItems
    this.newOrder.clientId = 'asdid'
    this.orderService.createOrder(this.newOrder).subscribe(resp => {
      this.showMessage('Orden generada correctamente', 'success')
      this.resetAll();

    }, error => {
      this.showMessage('Error en tu orden', 'error', 'Verifica que todos los campos estén llenos')
    })  
  }

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }
  createItems(items: Product[]){
     
  }


}
