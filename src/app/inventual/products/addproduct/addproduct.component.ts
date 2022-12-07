import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Unit } from '../../enums/unit.enum';
import { Category } from '../../interfaces/category.interface';
import { Product } from '../../interfaces/product.interface';
import { Store } from '../../interfaces/store.interface';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddproductComponent implements OnInit {
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  newProduct: Product = {
    id: undefined,
    name: '',
    storeId: '',
    categoryId: '',
    stock: undefined
  };
  selectedUnit: Unit= Unit.KILOS
  units: string[] = Object.keys(Unit)
  selectedCategory: string = ""
  categories: Category[] = [];
  selectedStore: string = ""
  stores: Store[] = [];
  quantity: number = 0
  myfunction() {
    if (this.menuSidebarActive == false) {
      this.menuSidebarActive = true;
    } else {
      this.menuSidebarActive = false;
    }
  }

  validateNewProduct(){
    return (this.newProduct.name != '' &&
    this.newProduct.storeId != '' &&
    this.newProduct.categoryId != '' )
    
  }
  //sidebar menu activation end
  createProduct() {
    this.newProduct.categoryId = this.selectedCategory;
    this.newProduct.storeId = this.selectedStore;
    if(this.validateNewProduct())
      this.productService.createProduct(this.newProduct).subscribe((resp) => {
        Swal.fire({
          title: 'Producto creado!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        this.cleanView()
      });
    else
      Swal.fire({
        title: 'Error!',
        text: 'Los campos con * son Obligatorios',
        icon: 'warning',
        confirmButtonText: 'Cool'
      })
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeService: StoreService

  ) {
    this.getCategories();
    this.getStores()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((resp) => {
      this.categories = resp;
    });
  }

  getStores() {
    this.storeService.getStores().subscribe((resp) => {
      this.stores = resp;
    });
  }

  cleanView(){
    this.newProduct = {
      id: undefined,
      name: '',
      storeId: '',
      categoryId: '',
      stock: undefined
    };
    this.selectedUnit= Unit.KILOS
    this.units = Object.keys(Unit)
    this.selectedCategory= ""
    this.selectedStore = ""
    this.quantity = 0
  }
  ngOnInit(): void {}
}
