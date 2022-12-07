import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
//for checkbox

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductcategoryComponent implements OnInit {
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
//checkbox start
task: Task = {
  name: '',
  completed: false,
  color: 'primary',
  
};

newCategoryName:string = ""
categories : Category[] = []


createCategory(){
  console.log(   this.newCategoryName
    );
  this.categoryService.createCategory(this.newCategoryName).subscribe(resp => {
    this.getCategories()
    this.newCategoryName = ""
  });
}

getCategories() {
   this.categoryService.getCategories().subscribe(resp => {
    this.categories = resp;
    console.log(this.categories);
    
  });
} 

deleteCategory(id : string | undefined){
  this.categoryService.deleteCategory(id).subscribe(resp => {
    this.getCategories()
  }, 
  error => {
    this.showMessage("No se puede borrar", "error", error.error.msg)
  });
}

showMessage(title: string, icon: SweetAlertIcon, text?: string){
  Swal.fire({
    title: title,
    icon: icon,
    text: text
    
  })
}

constructor(private categoryService: CategoryService) {
  this.getCategories()
}
//checkbox end

  

  ngOnInit(): void {
  }

}
