import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopCategoryComponent } from '../shop-category.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';

@Component({
  selector: 'app-add-shop-category',
  templateUrl: './add-shop-category.component.html',
  styleUrls: ['./add-shop-category.component.scss']
})
export class AddShopCategoryComponent implements OnInit {




  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopCategoryComponent>,  
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  ngOnInit(): void {
   
  }


  shopCategoryName:any;
  actionbtn = 'Save';




  closeDialogue(){
    this.dialogRef.close('Update');
  }


  reset(){
    this.shopCategoryName = '';
    this.actionbtn = 'Save';
  }


}
