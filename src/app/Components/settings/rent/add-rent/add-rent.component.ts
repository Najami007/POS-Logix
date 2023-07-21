import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { RentComponent } from '../rent.component';

@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.scss']
})
export class AddRentComponent {



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<RentComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  actionbtn='Save';
  floorID:any;
  shopCategoryID:any;
  rentTitle:any;
  rentCharges:any;
  Description:any;



  reset(){
    this.actionbtn='Save';
    this.floorID ='';
    this.shopCategoryID ='';
    this.rentTitle ='';
    this.rentCharges ='';
    this.Description ='';
  }
  
  closeDialogue(){
    this.dialogRef.close('Update');
  }

}
