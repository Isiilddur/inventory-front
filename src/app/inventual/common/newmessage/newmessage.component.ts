import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-newmessage',
  templateUrl: './newmessage.component.html',
  styleUrls: ['./newmessage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewmessageComponent implements OnInit {
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
  constructor() { }
  ngOnInit(): void {}

  // editor: Editor = new Editor;
  // html = "Type here"; //we can assign custom data or api call data 

  // ngOnInit(): void {
  //   this.editor = new Editor();
  // }
  // ngOnDestroy(): void {
  //   this.editor.destroy();
  // }

}
