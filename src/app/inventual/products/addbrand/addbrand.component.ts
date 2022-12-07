import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { StoreService } from '../../services/store.service'; 
import { Store } from '../../interfaces/store.interface';

//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddbrandComponent implements OnInit {

//sidebar menu activation start
menuSidebarActive:boolean=false;
newBrandName:string="";
stores : Store[] = []
myfunction(){
  if(this.menuSidebarActive==false){
    this.menuSidebarActive=true;
  }
  else {
    this.menuSidebarActive=false;
  }
}
//sidebar menu activation end
createBrand(){
  this.storeService.createStore(this.newBrandName).subscribe(resp => {
    this.getStores()
    this.newBrandName = ""
  });
}

 getStores() {
   this.storeService.getStores().subscribe(resp => {
    this.stores = resp;
    
  });
} 

deleteStore(id : string | undefined){
  this.storeService.deleteStore(id).subscribe(resp => {
    this.getStores()
  });
}

constructor(private storeService: StoreService) {
  this.getStores()
}

ngOnInit(): void {
  console.log(this.stores);
  
  
}

}
