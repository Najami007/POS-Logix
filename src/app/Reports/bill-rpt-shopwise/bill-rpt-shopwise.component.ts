import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-bill-rpt-shopwise',
  templateUrl: './bill-rpt-shopwise.component.html',
  styleUrls: ['./bill-rpt-shopwise.component.scss']
})
export class BillRptShopwiseComponent implements OnInit{



  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private globalData:GlobalDataModule
  ){}


  ngOnInit(): void {
    this.getShop();
    this.globalData.setHeaderTitle('Bill Rpt ShopWise')
  }

  txtSearch:any;

shopList:any;
shopID:any;
startDate = new Date();
EndDate = new Date();

reportData:any;
curShopTitle:any;


getShop(){
  this.app.startLoaderDark();
  this.http.get(environment.mallApiUrl+'GetShop').subscribe(
    {
      next:value=>{
        // console.log(value);
        this.shopList = value;
        this.app.stopLoaderDark();
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify('error Occured while Loading Data');
        this.app.stopLoaderDark();
      }
    }
  )
}

shopChange(){
 ////////////////////////////// will change the value of current shop Title///////////////
 var curRow = this.shopList.find((e:any)=> e.shopID == this.shopID );
 this.curShopTitle = curRow.shopTitle;
}





getRpt(){

  if(this.shopID == "" || this.shopID == undefined){
    this.msg.WarnNotify('Select The Shop');
  }else{

    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetBillRptShopwise?startdate='+this.startDate.toISOString().substring(0,10)+'&enddate='+
    this.EndDate.toISOString().substring(0,10)+'&shopid='+this.shopID).subscribe(
      (Response)=>{
        console.log(Response);
        this.reportData = Response;
        this.app.stopLoaderDark();
      },
    (error)=>{
      this.app.stopLoaderDark();
    }
    )
  }
 
}

PrintTable(){
  this.globalData.printData('#printRpt');
}




}
