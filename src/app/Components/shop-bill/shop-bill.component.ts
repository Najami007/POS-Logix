import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { BillformComponent } from './billform/billform.component';
import * as $ from 'jquery';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-shop-bill',
  templateUrl: './shop-bill.component.html',
  styleUrls: ['./shop-bill.component.scss']
})
export class ShopBillComponent implements OnInit{


  mappedShopData:any
  searchShop:any;
  searchBill:any;
  SavedBillList:any;
  billPrintData:any;
  billData:any = [];
  partyList:any;
  billTotal = 0;

  customerBillData:any;

  customerID:any;
  billDate:any;
  lblCustomerName:any;
  lblDate:any;
  

  ////////////////////print Table Variables//////////////////////////////////////////

  pBillNo:any = '';
  pBillDate:any="";
  pAccountTitle = 'Mehria Town Pvt. (ltd)';
  pAccountNo = '57365001517411';
  pShopName :any;
  pCustomername:any;
  pDueDate:any;
  pRentCharges:any;
  pCamCharges:any;
  TotalCharges:any;
  tableData:any =[];
  billRemarks:any;




  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule){}

  ngOnInit(): void {
    this.globaldata.setHeaderTitle('Shop Billing')
 this.getMappedData();
 this.getSavedBill();
 this.getParty();
  }


  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.partyList = value;
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

  getMappedData(){
    this.http.get(environment.mallApiUrl+'GetMappedShop').subscribe(
      {
        next:value=>{
          // console.log(value);
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

   getSavedBill(){
    this.http.get(environment.mallApiUrl+'getbill').subscribe(
      {
        next:value=>{
          console.log(value);
          this.SavedBillList = value;
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured While Loading Data');
          console.log(error);
        }
      }
    )
   }



   //////////////////////////////////////////////////////

   generateBill(row:any){
    this.dialogue.open(BillformComponent,{
      width:'40%',
      data:row,
    }).afterClosed().subscribe(val=>{
      this.getSavedBill();
    })
   }


   ////////////////////////////////////////////////

   PrintBill(row:any) {
    this.resetPrint();
    this.pBillNo = row.billNo;
    this.pBillDate = row.billDate;
    this.pShopName = row.shopTitle;
    this.pCustomername = row.partyName;
    this.TotalCharges = row.charges;
    this.billRemarks = row.remarks;
    this.tableData.push(
      {title:'Rent',charges:row.rentCharges * row.shopAreaSQ},
      {title:'CAM',charges:row.camCharges * row.shopAreaSQ},
      {title:'Wapda',charges:row.wapdaCharges},
     );



    this.getSingleBill(row);
   

   
    
    
  }


  ////////////////////////////////////////////////////////

  getSingleBill(row:any){
    
    this.http.get(environment.mallApiUrl+'getsinglebill?billno='+row.billNo).subscribe(
      (Response:any)=>{
         
        this.billData = Response;
        if(Response.length > 0){
          
         for(var i = 0; Response.length > i;i++ ){
          this.tableData.push(
            {title:Response[i].serviceTitle,charges:Response[i].serviceCharges});
            
         }
         setTimeout(() => {
          this.globaldata.printData('#printBill');
        }, 1000);
          
        
           
        }
      }
    )
  }



  //////////////////////////////////////////////////////////

  getCustomerBill(){
    if(this.customerID == ''){
      this.msg.WarnNotify('Select Customer');
    }else if(this.billDate == '' || this.billDate == undefined){
      this.msg.WarnNotify('Select Date')
    }else{
      this.http.get(environment.mallApiUrl+'GetPartyBill?billdate='+this.billDate.toISOString()+'&partyid='+this.customerID).subscribe(
        (Response:any)=>{
          this.lblCustomerName = Response[0].partyName;
          this.lblDate = this.billDate;
          console.log(this.lblDate);
         
         if(Response != ''){
          this.customerBillData = Response;
          setTimeout(() => {
            this.globaldata.printData('#customerBills');
          }, 1000);
          this.customerID = '';
          this.billDate = '';
          Response.forEach((e:any) => {
            this.billTotal += e.charges;
          });
        


         }else{
          this.msg.WarnNotify('No Data Available');
         }
          
        }
      )
    }
   
    
    

  }

  ////////////////////////////////////////////////////////

  approveBill(row:any){
    this.http.post(environment.mallApiUrl+'ApproveBill',{
      BillNo:row.billNo,
    PartyID: row.partyID,
    UserID: this.globaldata.currentUserValue.userID,
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify('Bill Approved');
          this.getSavedBill();
          this.getMappedData();       
         }else{
          this.msg.WarnNotify(Response.msg);
         }
      }
    )
  }



  /////////////////////////////////////////////////////////////////////////////

  DeleteBill(row:any){
    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      iconColor:'red',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'DeleteBill',{
          BillNo:row.billNo,
        UserID: this.globaldata.currentUserValue.userID,
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getSavedBill(); 
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });
   

    
  }

  resetPrint(){
    this.pBillNo ="";
    this.pBillDate = "";
    this.pShopName = "";
    this.pCustomername = "";
    this.tableData = [];
  }

}
