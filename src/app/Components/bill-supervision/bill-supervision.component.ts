import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { BillDetailsComponent } from '../shop-bill/bill-details/bill-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-supervision',
  templateUrl: './bill-supervision.component.html',
  styleUrls: ['./bill-supervision.component.scss']
})
export class BillSupervisionComponent implements OnInit{
  pBillNo: any;
  pBillDate: any;
  pShopName: any;
  pCustomername: any;
  TotalCharges: any;
  billRemarks: any;
  tableData: any;


  constructor(
    private http:HttpClient,
    private globalData:GlobalDataModule,
    private msg:NotificationService,
    private dialogue:MatDialog
    
  ){}


  ngOnInit(): void {
  
  }

  fromDate:any;
  toDate:any;



  getUnApprovedBill(){

  }

  getapproved(){
    
  }



  approveBill(row:any){
    Swal.fire({
      title:'success',
      text:'Confirm to Approve Bill',
      position:'center',
      icon:'success',
      iconColor:'green',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'ApproveBill',{
          BillNo:row.billNo,
        PartyID: row.partyID,
        ShopID:row.shopID,
        UserID: this.globalData.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify('Bill Approved');
                  
             }else{
              this.msg.WarnNotify(Response.msg);
             }
          }
        )
      }
    });
    
  }



   ////////////////////////////////////////////////

   PrintBill(row:any) {
   
    this.pBillNo = row.billNo;
    this.pBillDate = row.billDate;
    this.pShopName = row.shopTitle;
    this.pCustomername = row.partyName;
    this.TotalCharges = row.charges;
    this.billRemarks = row.remarks;
 

    this.getSingleBill(row.billNo,'#printBill');
   

    
    
    
  }



  ////////////////////////////////////////////////////////

  getSingleBill(billNo:any,printDiv:any){
    
    this.http.get(environment.mallApiUrl+'getsinglebill?billno='+billNo).subscribe(
      (Response:any)=>{
        console.log(Response);
        this.pBillDate = Response;
        if(Response.length > 0){

          ///////////////// will push the rent if cam is not zero
          if(Response[0].rentCharges != 0){
            this.tableData.push(   
              {title:'Rent',charges:Response[0].rentCharges * Response[0].shopAreaSQ},    
             );
          }

          ///////////////// will push the cam if cam is not zero
          if(Response[0].camCharges != 0){
            this.tableData.push(
              {title:'CAM',charges:Response[0].camCharges * Response[0].shopAreaSQ},
             );
          }
          
         
           
         for(var i = 0; Response.length > i;i++ ){
          if(Response[i].serviceTitle != '-'){
            this.tableData.push(
              {title:Response[i].serviceTitle,charges:Response[i].serviceCharges});
          }
          
            
         }
         
         if(printDiv != ''){
          setTimeout(() => {
            this.globalData.printData('#printBill');
          }, 500);
         }
        
           
        }
      }
    )
  }



   //////////////////////////////////////////////////////////////

   getBillDetails(billNo:any){
    this.tableData = [];

    this.http.get(environment.mallApiUrl+'getsinglebill?billno='+billNo).subscribe(
      (Response:any)=>{
        
       
        if(Response.length > 0){
          if(Response[0].rentCharges != 0){
            this.tableData.push(   
              {title:'Rent',charges:Response[0].rentCharges * Response[0].shopAreaSQ},    
             );
          }
          if(Response[0].camCharges != 0){
            this.tableData.push(

              {title:'CAM',charges:Response[0].camCharges * Response[0].shopAreaSQ},
            
             );
          }
         
          
         
         for(var i = 0; Response.length > i;i++ ){
          if(Response[i].serviceTitle != '-'){
            this.tableData.push(
              {title:Response[i].serviceTitle,charges:Response[i].serviceCharges});
          }
         }
        
         
       
          this.dialogue.open(BillDetailsComponent,{
            width:"50%",
            data:this.tableData,
          }).afterClosed().subscribe(val=>{
            
          })
         
     
           
        }
      }
    )
  }



}
