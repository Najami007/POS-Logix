import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

import { environment } from 'src/environments/environment.development';

import { HttpClient,HttpClientModule,HttpErrorResponse } from '@angular/common/http';
import { data, error } from 'jquery';
import { NotificationService } from 'src/app/Shared/service/notification.service';

import Swal from 'sweetalert2';




@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  constructor(private globalData:GlobalDataModule,
    private http : HttpClient,
    private msg:NotificationService,
    ){}
  ngOnInit(): void {
    this.globalData.setHeaderTitle('Add User');
    this.getUserData();
  }

  txtSearch='';

  btntype = 'Save';
  uName: String = '';
  loginName: String = '';
  uPassword: String = '';
  confirmPassword : String = '';
  uId = '';
  uContact:any;
  uRoleID:any;
  uPinCode:any;

   userData:any = [];
   progressbar = false;




   roleList:any=[
    {title:'Administrator',id:1},
    {title:'Admin',id:2},
    {title:'User',id:3}
   ]

 

  getUserData(){
    this.http.get(environment.mallApiUrl+'getuser').subscribe(
      (Response)=>{
        console.log(Response);
        this.userData = Response;
      }
    )
  }

  addUser(){
    // var currentUser = this.userData.find((e :any)=>{return e.UserEmail == this.uEmail });

   
      if(this.uName == '' || this.uName == undefined)
      {
          this.msg.WarnNotify('Enter UserName');
      }else if(this.loginName == '' || this.loginName == undefined){
        this.msg.WarnNotify('Enter Email Address');
      }else if(this.uContact == '' || this.uContact == undefined){
        this.msg.WarnNotify('Enter User Contact');
      }else if(this.uRoleID == '' || this.uRoleID == undefined){
        this.msg.WarnNotify('Select User Role')
      }
      else if(this.uPassword == '' || this.uPassword == undefined){
        this.msg.WarnNotify('Enter Password')
      }else if(this.confirmPassword == '' || this.confirmPassword == undefined){
        this.msg.WarnNotify('Enter Confirm Password')
      }else if(this.uPassword != this.confirmPassword){
        this.msg.WarnNotify('Password Donot Match with Eachother');
      }else if(this.uPinCode == '' || this.uPinCode == undefined){
        this.msg.WarnNotify('Enter The Pin Code')
      }
      else{
         if(this.btntype == 'Save'){
          this.insertUser();
         }else if(this.btntype == 'Update'){
          this.updateUser();
         }
      }

   
   
   
  }




  insertUser(){
    this.http.post(environment.mallApiUrl+'insertuser',{
      UserName: this.uName,
      MobileNo: this.uContact,
      LoginName: this.loginName,
      Password: this.uPassword,
      PinCode: this.uPinCode,
      RoleID: this.uRoleID,
      UserID: this.globalData.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }

  updateUser(){
    this.http.post(environment.mallApiUrl+'updateuser',{
      UserName: this.uName,
      MobileNo: this.uContact,
      LoginName: this.loginName,
      Password: this.uPassword,
      PinCode: this.uPinCode,
      RoleID: this.uRoleID,
      UserID: this.globalData.getUserID(),
      reqUserID: 1
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }

  
  delUser(item:any){
    this.http.post(environment.mallApiUrl+'deleteuser',{
      UserID:item.userID,
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Deleted Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }


  blockUser(item:any){
    this.http.post(environment.mallApiUrl+'blockuser',{
      TempBlock:true,
      UserID: item.userID,
    }).subscribe(
      
    )
  }

  resetPin(item:any){
    this.http.post(environment.mallApiUrl+'resetpin',{
      UserID: item.userID,
      reqUserID: item.reqUserID,
    }).subscribe(
      
    )
  }


























  getUserById(item:any){

    this.uName = item.userName;
    this.loginName = item.userEmail;
    this.uPassword = item.userPassword;
    this.confirmPassword = item.userPassword;
    this.uId = item.userID;
    this.btntype = 'Update';

  }

  deleteUser(id:any){
    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the User',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){
        
       if(id == this.globalData.getUserID()){
        Swal.fire('Alert!',
        'Unable To Delete this User'
)

       }else{
        
        this.http.put(environment.apiUrl+'api/user/DeleteUser?id='+id,{ 
          UserID: this.globalData.getUserID(),
          
        }).subscribe((value:any)=>{
          console.log(value);
          this.getUserData();
            this.reset();
            Swal.fire('Deleted!',
                  'User has Been Deleted'
        );
        })
       }
      }
    });
    
    
  }

 














  reset(){
    this.uName='';
    this.loginName='';
    this.uPassword='';
    this.confirmPassword='';
    this.btntype= 'Save';
    this.uPinCode = '';
    this.uRoleID = '';
  }



}
