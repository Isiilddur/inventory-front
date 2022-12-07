import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { categoriesData } from '../../interfaces/categoriesData.interface';
import { Store } from '../../interfaces/store.interface';
import { storeData } from '../../interfaces/storeData.interface';
import { CategoryService } from '../../services/category.service';
import { DashboardService } from '../../services/dashboard.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  
  constructor(private storeService: StoreService, private dashboardService: DashboardService, 
    private categoryService: CategoryService) {
    this.getStores()
    this.getCategories()
    this.getCategoriesData()
  }

  categoriesData : categoriesData[] = []
  categories : Map<string | undefined, string> = new Map()
  ngOnInit(): void {}
  stores: Store[] = []
  range: string = ""

  changeRange(range: string){
    this.range = range
    this.getCategoriesData()
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

  getStores() {
    this.storeService.getStores().subscribe(resp => {
     this.stores = resp;
     
   });
  }

  getCategoriesData(){
    this.dashboardService.getCategoriesData(this.range).subscribe(resp => {
      this.categoriesData = resp;
    })
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(resp => {
      resp.forEach(category => {
        this.categories.set(category.id, category.name)
      })
    })
  }
  //sidebar menu activation end

}
