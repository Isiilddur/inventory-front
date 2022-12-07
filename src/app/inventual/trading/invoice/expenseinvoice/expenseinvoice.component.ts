import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-expenseinvoice',
  templateUrl: './expenseinvoice.component.html',
  styleUrls: ['./expenseinvoice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExpenseinvoiceComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}
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
  counter(type:string) {
    type==="add" ?this.count++:this.count--;
  }
  counter1(type:string) {
    type==="add" ?this.count1++:this.count1--;
  }

}
