import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Category } from '../../interfaces/category.interface';
import { Product } from '../../interfaces/product.interface';
import { Store } from '../../interfaces/store.interface';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { AddstockComponent } from '../../trading/sale/popup/addstock/addstock.component';

//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductlistComponent implements OnInit {
 

  stores: Map<string | undefined,string> = new Map()
  categories : Map<string | undefined,string> = new Map()
  products: Product[] = [];

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
 
  incrementarInventario(id: string | undefined){
    this.dialog.open(AddstockComponent, {data: {idProduct:id}})
  }
  deleteProduct(id: string | undefined){
    debugger;
    this.productService.deleteProduct(id).subscribe((resp) => {
      this.getProducts()
    }, error => {
      console.log(error);
      
        this.showMessage("No se puede borrar", "error", error.error.msg)
    });
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
      this.products = resp;
    });
  }
  constructor(public dialog: MatDialog,private productService: ProductService,
    private categoryService: CategoryService,
    private storeService: StoreService) { 
      this.getCategories()
      this.getStores()

    }

  ngOnInit(): void {
    this.getProducts()
    console.log(this.categories);
    console.log(this.stores);

    
  }

  showMessage(title: string, icon: SweetAlertIcon, text?: string){
    Swal.fire({
      title: title,
      icon: icon,
      text: text
      
    })
  }

}
