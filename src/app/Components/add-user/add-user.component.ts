import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment';
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
  uEmail: String = '';
  uPassword: String = '';
  confirmPassword : String = '';
  uId = '';
  uContact:any;
  uRoleID:any;
  uPinCode:any;

   userData:any = [];
   progressbar = true;

 

  getUserData(){
     return this.http.get(environment.apiUrl+'api/user/getUserData').subscribe((value:any)=>{
      this.userData = value;
      this.progressbar = false;
    });
  }

  addUser(){
    // var currentUser = this.userData.find((e :any)=>{return e.UserEmail == this.uEmail });

    if(this.btntype == 'Save'){
      if(this.uName == '' || this.uName == undefined)
      {
          this.msg.WarnNotify('Enter UserName');
      }else if(this.uEmail == '' || this.uEmail == undefined){
        this.msg.WarnNotify('Enter Email Address');
      }else if(this.uPassword == '' || this.uPassword == undefined){
        this.msg.WarnNotify('Enter Password')
      }else if(this.confirmPassword == '' || this.confirmPassword == undefined){
        this.msg.WarnNotify('Enter Confirm Password')
      }
      // else if(currentUser.userEmail == this.uEmail){
      //   this.msg.WarnNotify("User Email Already Exists!");
      // }
      else{
        if(this.uPassword != this.confirmPassword){
          this.msg.WarnNotify('Password Donot Match with Eachother');
        }else if(this.uPassword == this.confirmPassword){
           this.http.post(environment.apiUrl+'api/user/insertUserData',{
            userName:this.uName,
            userEmail:this.uEmail,
            userPassword:this.uPassword,
            userID:this.globalData.currentUserValue.userID,
            // token: this.globalData.currentUserValue.token,
          },{responseType: 'text'})
          .subscribe(
            {
              next: (value )=>{
               ////////get the response value and shows the notification as it is/////////////
                if(value == 'User Added Succesfully'){
                  this.msg.SuccessNotify(value);
                  this.getUserData();
                  this.reset();
                }else{
                    this.msg.WarnNotify(value+'! Please Check The Credentials');
                }
              },
              error : error=>{
                console.log(error);
              }

            }
          )
        }
      }

   
    }else if(this.btntype == 'Update'){
      if(this.uName == '' || this.uName == undefined)
      {
          this.msg.WarnNotify('Enter UserName');
      }else if(this.uEmail == '' || this.uEmail == undefined){
        this.msg.WarnNotify('Enter Email Address');
      }else if(this.uPassword == '' || this.uPassword == undefined){
        this.msg.WarnNotify('Enter Password')
      }else if(this.confirmPassword == '' || this.confirmPassword == undefined){
        this.msg.WarnNotify('Enter Confirm Password')
      }
      // else if(currentUser.userEmail == this.uEmail && currentUser.userID != this.uId){
      //   this.msg.WarnNotify("User Email Already Exists!");
      // }
      else{
        if(this.uPassword != this.confirmPassword){
          this.msg.WarnNotify('Password Donot Match with Eachother');
        }else if(this.uPassword == this.confirmPassword){
          this.http.put(environment.apiUrl+'api/user/updateUserData?id='+this.uId,{
            userName:this.uName,
            userEmail:this.uEmail,
            userPassword:this.uPassword,
            userID:this.globalData.currentUserValue.userID,
            // token: this.globalData.currentUserValue.token,
          },{responseType:'text'}).subscribe({
            next: value =>{


                if(value == "User Data Updated Succesfully"){
                  this.msg.SuccessNotify("User Data Updated Succesfully");
                  this.getUserData();
                    this.reset();
                 
                }else{
                  this.msg.WarnNotify(value);
                }
               
            },
            error: error=>{
              console.log(error);
              this.msg.WarnNotify('An Error Occured While Updating Data!');
            }
            
          });
        }
        
      }
      
      
    }  
   
  }




  getUserById(item:any){
    
    // var currentUser = this.userData.find((e :any)=>{return e.userID == id});
    // this.uName = currentUser.userName;
    // this.uEmail = currentUser.userEmail;
    // this.uPassword = currentUser.userPassword;
    // this.confirmPassword = currentUser.userPassword;
    // this.uId = currentUser.userID;
    // this.btntype = 'Update';

    this.uName = item.userName;
    this.uEmail = item.userEmail;
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
        
       if(id == this.globalData.currentUserValue.userID){
        Swal.fire('Alert!',
        'Unable To Delete this User'
)

       }else{
        
        this.http.put(environment.apiUrl+'api/user/DeleteUser?id='+id,{ 
          UserID: this.globalData.currentUserValue.userID,
          
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
    this.uEmail='';
    this.uPassword='';
    this.confirmPassword='';
    this.btntype= 'Save';
  }



}
