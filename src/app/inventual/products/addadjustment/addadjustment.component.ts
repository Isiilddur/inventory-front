import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-addadjustment',
  templateUrl: './addadjustment.component.html',
  styleUrls: ['./addadjustment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddadjustmentComponent implements OnInit {

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
count1=0
count2=0
count3=0
count4=0
counter(type:string) {
  type==="add" ?this.count++:this.count--;
}
counter1(type:string) {
  type==="add" ?this.count1++:this.count1--;
}
counter2(type:string) {
  type==="add" ?this.count2++:this.count2--;
}
counter3(type:string) {
  type==="add" ?this.count3++:this.count3--;
}
counter4(type:string) {
  type==="add" ?this.count4++:this.count4--;
}


constructor() {}

ngOnInit(): void {}

}
