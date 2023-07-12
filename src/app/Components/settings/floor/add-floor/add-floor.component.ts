import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { FloorComponent } from '../floor.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.scss']
})
export class AddFloorComponent implements OnInit{


  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<FloorComponent>,  
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {

  }




  floorName:any;
  actionbtn = 'Save';




  closeDialogue(){
    this.dialogRef.close('Update');
  }


  reset(){
    this.floorName = '';
    this.actionbtn = 'Save';
  }

}
