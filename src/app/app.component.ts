import { Component } from '@angular/core';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mall Management';
constructor(){}
  

  ngOnInit(){
    // this.stopLoaderDark();
    // this.stopLoaderLight();
  }


  startLoaderDark() {
    $(".loaderDark").show();
  }

  stopLoaderDark() {
    $(".loaderDark").fadeOut(500);
  }

  startLoaderLight() {
    $(".loaderLight").show();
    //$(".btnLoader").show();
  }

  stopLoaderLight() {
    $(".loaderLight").hide();
    //$(".btnLoader").hide(1000);
  }

  

}
