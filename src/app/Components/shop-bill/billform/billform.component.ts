import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopBillComponent } from '../shop-bill.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import { AppComponent } from 'src/app/app.component';

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
  hvacCharges:any;
  GasCharges:any;
  GeneratorCharges:any;



  constructor(
    
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopBillComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService,
    
  ){}

  ngOnInit(): void {
    
  }




  changeValue(val: any) {
    // alert(val.target.value);
    if (val.target.value < '0') {
      val.target.value = '0';
    }else if(val.target.value == ''){
      val.target.value = '0';
    }
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
      // this.app.startLoaderDark();
      this.http.post(environment.mallApiUrl+'InsertGenBill',{
        ShopID: this.editData.shopID,
        PartyID: this.editData.partyID,
        BillDate: this.shopBillDate.toISOString().substring(0,10),
        ShopRentHistoryID: this.editData.shopRentHistoryID,
        ShopAreaSQ: this.editData.shopAreaSQ,
        Remarks: this.BillRemarks,
        WapdaCharges: this.wapdaCharges,
        HvacCharges:this.hvacCharges,
        GasCharges:this.GasCharges,
        GeneratorCharges:this.GeneratorCharges,
        UserID: this.global.currentUserValue.userID,
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              // console.log(Response);
              this.msg.SuccessNotify(Response.msg);
              //this.mainPage.eventEmitterprint.emit(Response.billNo);
              this.dialogRef.close(Response.billNo);
              // this.app.stopLoaderDark();
              
            }else{
              this.msg.WarnNotify(Response.msg);
              // this.app.stopLoaderDark();
            }
          },
          (error:any)=>{
            this.msg.WarnNotify('Error Occured while Saving')
            console.log(error);
            // this.app.stopLoaderDark();
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
