import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { CAMComponent } from '../cam.component';

@Component({
  selector: 'app-add-cam',
  templateUrl: './add-cam.component.html',
  styleUrls: ['./add-cam.component.scss']
})
export class AddCAMComponent {

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<CAMComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  actionbtn='Save';
  floorID:any;
  shopCategoryID:any;
  CAMTitle:any;
  camCharges:any;
  Description:any;



  reset(){
   
  }
  
  closeDialogue(){
    this.dialogRef.close('Update');
  }
}
