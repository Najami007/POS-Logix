import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-map-shop',
  templateUrl: './map-shop.component.html',
  styleUrls: ['./map-shop.component.scss']
})
export class MapShopComponent implements OnInit {

  constructor(private globaldata:GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService
    ){

  }

  ngOnInit(): void {
  this.globaldata.setHeaderTitle('Map Shop');
  this.getMappedData();
  this.getShop();
  this.getParty();
  this.getCam();
  this.getRent();
  this.getService();
  }

  txtSearch:any;
  ShopID:any;
  partyID:any;
  startDate:any;
  paymentDate:any;
  camID:any;
  camCharges:any;
  RentID:any;
  rentCharges:any;
  SevicesDetails:any;


  serviceID:any;
  serviceCharges:any;
  serviceType:any;
  serviceMonth:any;


  CAMList:any;
  RentList:any;
  customerList:any;
  ShopList:any;
  servicesList:any;


  mappedShopData:any;
  ServicesData:any=[]




  onCamIDChange(){
    var row = this.CAMList.find((x:any)=>x.camID == this.camID);
    console.log(row);
    this.camCharges = row.camCharges;
  }
  onRentIDChange(){
    var row = this.RentList.find((x:any)=>x.rentID == this.RentID);
    console.log(row);
    this.rentCharges = row.rentCharges;
  }

////////////////////////////////////////////////////

  getShop(){
    this.http.get(environment.mallApiUrl+'GetShop').subscribe(
      {
        next:value=>{
          // console.log(value);
          this.ShopList = value;
        },
        error:error=>{
          console.log(error);
          this.msg.WarnNotify('error Occured while Loading Data');
        }
      }
    )
  }

  //////////////////////////////////////////////

  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.customerList = value;
        // console.log(value);
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
        console.log(error);
      }        
      
      
    }
    )
  }

   //////////////////////////////////////////
   getCam(){
    this.http.get(environment.mallApiUrl+'GetCam').subscribe(
      {
        next:value=>{
          this.CAMList = value;
          // console.log(value);
        },
        error:error=>{
          console.log(error);
          this.msg.WarnNotify('Error Occured while Loading Data');
        }
      }
    )
  }


  ////////////////////////////////
  getRent(){
    this.http.get(environment.mallApiUrl+'getrent').subscribe(
      {
        next:value=>{
          this.RentList = value;
           //console.log(value);
        },
        error:error=>{
          console.log(error);
        }
        
      }
    )
  }

  //////////////////////////////////////////

  getService(){
    this.http.get(environment.mallApiUrl+'getservice').subscribe(
     {
       next:value=>{
         this.servicesList = value;
         // console.log(value);
       },
       error:error=>{
         this.msg.WarnNotify('Error Occured while Loading Data');
         console.log(error);
       }
     }
    ) 
   }
 


   //////////////////////////////////////////

   getMappedData(){
    this.http.get(environment.mallApiUrl+'GetMappedShop').subscribe(
      {
        next:value=>{
          console.log(value);
          this.mappedShopData = value;
        },

      error:error=>{
        console.log(error);
        this.msg.WarnNotify('Error Occured While loading data');
      }
      }
    )
   }



   ////////////////////////////////////////////////////

   saveMapShop(){
    console.log(this.ShopID,this.partyID,this.startDate,this.paymentDate,this.camID,this.camCharges,this.RentID,this.rentCharges,this.ServicesData);
    this.http.post(environment.mallApiUrl+'InsertMapShop',{
    ShopID: this.ShopID,
    PartyID: this.partyID,
    StartDate: this.startDate,
    RentPaymentDate: this.paymentDate,
    CamID: this.camID,
    CamCharges: this.camCharges,
    RentID: this.RentID,
    RentCharges: this.rentCharges,
    ServiceDetail:this.ServicesData,

    UserID: this.globaldata.currentUserValue.userID,
    }).subscribe(
      (Response:any)=>{
        console.log(Response.msg);
        if(Response.msg == 'Data Saved Succesffuly'){
          this.msg.SuccessNotify(Response.msg);
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      },
      (error:any)=>{
        console.log(error);
      }
    )
   }


   addService(){
    //console.log(this.serviceID,this.serviceCharges,this.serviceType,this.serviceMonth); 
    this.ServicesData.push({ServiceID:this.serviceID,ServiceCharges:this.serviceCharges,ServiceType:this.serviceType,TmpServiceMonth:this.serviceMonth});
    this.serviceID = '';
    this.serviceCharges = '';
    this.serviceType = '';
    this.serviceMonth = '';
   }
}
