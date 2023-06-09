import { Component } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  constructor( ){

  }
  ngOnInit(): void {

  }


  reporticon = 'arrow_drop_up';
  Expanded =  false;

  collapse(){
    this.Expanded = !this.Expanded;
    if(this.Expanded == true){
      this.reporticon = 'arrow_drop_down';
    }else{
      this.reporticon ='arrow_drop_up';
    }
  }


}
