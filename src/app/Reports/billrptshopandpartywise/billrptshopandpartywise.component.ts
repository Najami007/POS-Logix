import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-billrptshopandpartywise',
  templateUrl: './billrptshopandpartywise.component.html',
  styleUrls: ['./billrptshopandpartywise.component.scss']
})
export class BillrptshopandpartywiseComponent implements OnInit{


  constructor(

    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private global:GlobalDataModule,


  ){}

  ngOnInit(): void {
    this.getShop();
    this.getParty();
    this.global.setHeaderTitle('Bill Report Shop & Customerwise')
  }

  shopSearch:any;
  customerSearch:any;
  shopID:any;
  partyID:any;
  fromDate:Date = new Date();
  toDate:Date = new Date();
 




  shopList:any;
  partyList:any;
  ReportData:any;


/////////////////////////////////////////////////////////////////

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


  ///////////////////////////////////////////////////////

  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.partyList = value;
        //console.log(value);
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
        console.log(error);
      }        
      
      
    }
    )
  }



  ////////////////////////////////////////////////////

  getReportShopandPartyWise(){

    if(this.shopID == '' || this.shopID == ''){
      this.msg.WarnNotify('Select The Shop');
    }else if(this.partyID == '' || this.partyID == undefined){
      this.msg.WarnNotify('Select The Customer Name')
    }else{
      this.http.get(environment.mallApiUrl+'GetBillRptShopAndPartywise??startdate=+'+this.fromDate.toISOString().substring(0,10)+
      '&enddate='+this.toDate.toISOString().substring(0,10)+'&shopid='+this.shopID+'&partyid='+this.partyID).subscribe(
        (Response)=>{
          console.log(Response);
          this.ReportData = Response;
        },
        (Error)=>{
          this.msg.WarnNotify('Error Occured');
  
          console.log(Error);
  
        }
      )
    }
    
  }


  //////////////////////////////////////////////////////
  PrintTable(){
    

    if(this.ReportData != null){
      this.global.printData('#printRpt')
    }

    
  }




}
