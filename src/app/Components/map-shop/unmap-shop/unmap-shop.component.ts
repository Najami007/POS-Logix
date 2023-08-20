import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-unmap-shop',
  templateUrl: './unmap-shop.component.html',
  styleUrls: ['./unmap-shop.component.scss']
})
export class UnmapShopComponent implements OnInit {


  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    @Inject(MAT_DIALOG_DATA) public shopData : any,
     private dialogRef: MatDialogRef<UnmapShopComponent>,
     private globalData:GlobalDataModule

  ){}

  ngOnInit(): void {
    
  }



  EndDate:any;

  unMapShop(){
    if(this.EndDate == '' || this.EndDate == undefined){
      this.msg.WarnNotify('Select End Date')
    }else{
      this.http.post(environment.mallApiUrl+'InsertUnmapShop',{
        ShopRentHistoryID:this.shopData.shopRentHistoryID,
       ShopID: this.shopData.shopID,
        EndDate: this.EndDate,
    
        UserID: this.globalData.currentUserValue.userID,
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Updated Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.dialogRef.close('Update');
            this.EndDate = '';
          }else{
            this.msg.WarnNotify(Response.msg)
          }
        }
      )
    }
   
  }




}
