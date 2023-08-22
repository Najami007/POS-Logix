import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopBillComponent } from '../shop-bill.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';

@Component({
  selector: 'app-billform',
  templateUrl: './billform.component.html',
  styleUrls: ['./billform.component.scss']
})
export class BillformComponent implements OnInit {

  @ViewChild(ShopBillComponent) mainPage:any;


  @Output() eventEmitterprint = new EventEmitter();

  shopBillDate:any;
  BillRemarks:any;
  wapdaCharges:any;



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopBillComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){}

  ngOnInit(): void {
    
  }




  //////////////////////////////////////////////////////////////

  saveBill(){
    if(this.shopBillDate == '' || this.shopBillDate == undefined){
      this.msg.WarnNotify('Select Shop Bill Date')
    }else if(this.wapdaCharges === '' || this.wapdaCharges === undefined){
      this.msg.WarnNotify('Enter Wapda Charges')
    }else if(this.BillRemarks == '' || this.BillRemarks == undefined){
      this.BillRemarks = '-';
    }else{
      this.http.post(environment.mallApiUrl+'InsertGenBill',{
        ShopID: this.editData.shopID,
        PartyID: this.editData.partyID,
        BillDate: this.shopBillDate,
        ShopRentHistoryID: this.editData.shopRentHistoryID,
        ShopAreaSQ: this.editData.shopAreaSQ,
        Remarks: this.BillRemarks,
        WapdaCharges: this.wapdaCharges,
        UserID: this.global.currentUserValue.userID,
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              // console.log(Response);
              this.msg.SuccessNotify(Response.msg);
              //this.mainPage.eventEmitterprint.emit(Response.billNo);
              this.dialogRef.close(Response.billNo);
              
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          },
          (error:any)=>{
            console.log(error);
          }
        )
    }
   
  }


  


  closeDialogue(){
    this.dialogRef.close();
  }

  reset(){
    this.shopBillDate='';
    this.wapdaCharges = '';
    this.BillRemarks = '';
  }


}
