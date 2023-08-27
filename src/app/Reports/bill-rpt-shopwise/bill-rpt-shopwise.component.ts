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
  }

  txtSearch:any;

shopList:any;
shopID:any;
startDate = new Date();
EndDate = new Date();

reportData:any;
curShop:any;


getShop(){
  this.http.get(environment.mallApiUrl+'GetShop').subscribe(
    {
      next:value=>{
        // console.log(value);
        this.shopList = value;
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify('error Occured while Loading Data');
      }
    }
  )
}


getRpt(){
  if(this.shopID == "" || this.shopID == undefined){
    this.msg.WarnNotify('Select The Shop');
  }else{
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetBillRptShopwise?startdate='+this.startDate+'&enddate='+this.EndDate+'&shopid='+this.shopID).subscribe(
      (Response)=>{
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
