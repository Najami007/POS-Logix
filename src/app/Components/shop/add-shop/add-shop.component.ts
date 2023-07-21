import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopComponent } from '../shop.component';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit{

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(){
    this.global.setHeaderTitle("Add Shop");
  }


  actionbtn='Save';
  camID:any;
  rentID:any;
  shopTitle:any;
  shopCode:any;
  area:any;



  reset(){
    this.actionbtn='Save';
    this.camID='';
    this.rentID='';
    this.shopTitle='';
    this.shopCode='';
    this.area='';
  
  }
  
  closeDialogue(){
    this.dialogRef.close('Update');
  }

}
