import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ServicesComponent } from '../services.component';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent {



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ServicesComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  actionbtn='Save';
  serviceTitle:any;
  serviceCharges:any;
  Description:any;



  reset(){
    this.actionbtn='Save';
    this.serviceTitle ='';
    this.serviceCharges ='';
    this.Description ='';
  }
  
  closeDialogue(){
    this.dialogRef.close('Update');
  }


}
