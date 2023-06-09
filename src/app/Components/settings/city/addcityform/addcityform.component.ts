import { HttpClient } from '@angular/common/http';
import {  Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-addcityform',
  templateUrl: './addcityform.component.html',
  styleUrls: ['./addcityform.component.scss']
})
export class AddcityformComponent implements OnInit{

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddcityformComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {
   

    if(this.editData){
      this.actionbtn = "Update";
      this.cityName = this.editData.cityName;
    }

  }


  actionbtn = 'Save';
  cityName :any;


  addCity(){
    if(!this.editData){
      this.http.post(environment.apiUrl+'api/city/insertcity',{
        cityName:this.cityName,
        createdBy:this.global.currentUserValue.userID,
      },{responseType:'text'}).subscribe({
        next:(value:any)=>{
          if(value == "City Name Already Exists"){
            this.msg.WarnNotify(value);
          }else{
            this.msg.SuccessNotify(value);
          this.reset();
          this.dialogRef.close();
          }
        },
        error:error=>{
          console.log(error);
          this.msg.WarnNotify(error.toString());
        }
      })
    }else{
      this.updateProduct();
    }
  }


  updateProduct(){
    this.http.put(environment.apiUrl+'api/city/updatecity?id='+this.editData.cityID,{
      cityName : this.cityName,
      modifiedBy:this.global.currentUserValue.userID,
    },{responseType:'text'}).subscribe({
      next:value=>{
       if(value == "City Name Already Exists"){
        this.msg.WarnNotify(value);

       }else{
        this.msg.SuccessNotify(value),
        this.reset();
        this.dialogRef.close("update");
       }
      }
    })
  }


  reset(){
    this.cityName = '';
  }

}
