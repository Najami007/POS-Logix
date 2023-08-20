import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data, error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { AddShopCategoryComponent } from '../settings/shop-category/add-shop-category/add-shop-category.component';
import { AddServiceComponent } from './add-shopservice/add-service.component';
import { UnmapShopComponent } from './unmap-shop/unmap-shop.component';

@Component({
  selector: 'app-map-shop',
  templateUrl: './map-shop.component.html',
  styleUrls: ['./map-shop.component.scss']
})
export class MapShopComponent implements OnInit {

  constructor(private globaldata:GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService,
    private dialogue:MatDialog,
    
    ){
    
  }

  

  ngOnInit(): void {
  this.globaldata.setHeaderTitle('Map Shop');
  this.getMappedData();
  this.getShop();
  this.getParty();
  this.getService();



  }

  txtSearch:any;
  ShopID:any;
  partyID:any;
  startDate :any;
  paymentDate:any;
  camID:any;
  camCharges:any;
  rentID:any;
  rentCharges:any;
  SevicesDetails:any;


  serviceID:any;
  serviceCharges:any;
  serviceType:any;
  serviceMonth:any;
  serviceTitle:any;


  CAMList:any;
  RentList:any;
  customerList:any;
  ShopList:any;
  servicesList:any;


  mappedShopData:any;
  ServicesData:any=[];

  EndDate:any;



  

  /////////////////////////////////////////////

  onServiceIDChange(){
    var row = this.servicesList.find((x:any)=>x.serviceID == this.serviceID);

    this.serviceCharges = row.serviceCharges;
    this.serviceTitle = row.serviceTitle;
  }

  ///////////////////////////////////

  onShopIDChage(){
    var row = this.ShopList.find((x:any)=>x.shopID == this.ShopID);

    this.camID = row.camID;
    this.rentID = row.rentID;
    this.camCharges = row.camCharges;
    this.rentCharges = row.rentCharges;
    
  }
////////////////////////////////////////////////////

  getShop(){
    this.http.get(environment.mallApiUrl+'GetShop').subscribe(
      {
        next:value=>{
          console.log(value);
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

   /////////////////////////////////////////////////////
   addService(){
    // this.serviceMonth = this.formatDate(this.serviceMonth,'dd-mm-yyyy');
    // this.serviceMonth = this.serviceMonth.toISOString().substring(0, 10);
    //console.log(this.serviceID,this.serviceCharges,this.serviceType,this.serviceMonth); 
    this.ServicesData.push({ServiceID:this.serviceID,ServiceCharges:this.serviceCharges,ServiceType:this.serviceType,TmpServiceMonth:this.serviceMonth.toLocaleString()});
    this.serviceID = '';
    this.serviceCharges = '';
    this.serviceType = '';
    this.serviceMonth = '';
    this.serviceTitle = '';
   }

   ////////////////////////////////////////////////////

   saveMapShop(){

    // this.startDate = this.formatDate(this.startDate,'dd-mm-yyyy');

    // this.startDate = this.startDate.toISOString().substring(0, 10);
   
    
    console.log(this.ShopID,this.partyID,this.startDate,this.paymentDate,this.camID,this.camCharges,this.rentID,this.rentCharges,this.ServicesData,this.globaldata.currentUserValue.userID)
    console.log(typeof(this.ShopID),typeof(this.partyID),typeof(this.startDate),typeof(this.paymentDate),typeof(this.camID),typeof(this.camCharges),typeof(this.rentID),typeof(this.rentCharges),typeof(this.ServicesData),typeof(this.globaldata.currentUserValue.userID));
    this.http.post(environment.mallApiUrl+'InsertMapShop',{
      ShopID: this.ShopID,
      PartyID: this.partyID,
      StartDate: this.startDate,
      RentPaymentDate: this.paymentDate.toLocaleString(),
      CamID: this.camID,
      CamCharges: this.camCharges,
      RentID: this.rentID,
      RentCharges: this.rentCharges,
      ServiceDetail:JSON.stringify(this.ServicesData),

      UserID: this.globaldata.currentUserValue.userID,
    }).subscribe(
      (Response:any)=>{
        console.log(Response.msg);
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getMappedData();
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
   }


   ///////////////////////////////////////

   reset(){
    this.ShopID = '';
    this.camID = '';
    this.camCharges = '';
    this.rentID = '';
    this.rentCharges = '';
    this.startDate = '';
    this.paymentDate = '';
    this.ServicesData = [];
   }
  
   ///////////////////////////////////////////////

   addNewShopService(row:any){
    this.dialogue.open(AddServiceComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe({
      next:value=>{
        if(value == "Update"){
          this.getMappedData();
        }
      }
    })
   }


   //////////////////////////////////

   UnMapShop(row:any){
    this.dialogue.open(UnmapShopComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe({
      next:value=>{
        if(value == "Update"){
          this.getMappedData();
        }
      }
    })
   }
}
