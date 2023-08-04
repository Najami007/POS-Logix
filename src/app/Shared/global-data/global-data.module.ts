import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import { userInterface } from '../Interfaces/login-user-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GlobalDataModule  {


  
   
   private currentUserSubject:BehaviorSubject<userInterface>;
   public currentUser: Observable<userInterface>;


  constructor(
    private http:HttpClient,
    private rout : Router,
    private msg : NotificationService
    ){

      this.currentUserSubject = new BehaviorSubject<userInterface>(
        JSON.parse(localStorage.getItem('currentUser') || '{}')
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }

    private _headerTitleSource = new Subject<string>();
    header_title$ = this._headerTitleSource.asObservable();
 


  public get currentUserValue(): userInterface {
    return this.currentUserSubject.value;
  }


  curUserValue : any=[];

  UserValue:any = {
    _encuid :'',
    _encuname:'',

  }



///////////////////////////////////////////////////////////
  /////////////////////login funciton///////////////////////
  ////////////////////////////////////////////////////////
  login(Email:String,password:string){

    // if(Email == 'a' && password == 'a'){
    //   this.rout.navigate(["main"]);
    // }else{
    //   this.msg.WarnNotify('Enter Valid Email or password')
    // }

    this.http.post(environment.apiUrl+'api/user/auth',{
      loginEmail: Email,
      loginPassword: password,
    }).subscribe({
      next:(value)=>{
        
       
       if(value !=null ){
        Swal.fire({
          title:'',
          text:"Login Successful",
          position:'center',
          icon:'success',
          showConfirmButton:true,
          confirmButtonText:'OK',
          confirmButtonColor:'Green',
          timer:2000,
          timerProgressBar:true,

        }).then((value)=>{
   
          this.rout.navigate(["main"]);
        })
        
        
        // this.curUserValue = window.btoa(value.toString());
        // this.UserValue._encuid=window.btoa(this.curUserValue.userID);;
        // this.UserValue._encuname= window.btoa(this.curUserValue.userName);
        

        // localStorage.setItem('_usercur',JSON.stringify(this.curUserValue));
        localStorage.setItem('currentUser',JSON.stringify(value));
       }else{
        this.msg.WarnNotify('Error Occurred While Login Process');
       }
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify('Error Occurred While Login Process')
      }
    })

    
  }

  ////////////////////////////////////////////////////
/////////////funtion to keep user log out/////////////////////
///////////////////////////////////////////////////////////
  logout(){

    localStorage.removeItem('currentUser');
    this.rout.navigate(['login']);
  }






  //////////////sets the header title ////////////////////////
  setHeaderTitle(title: string) {
    this._headerTitleSource.next(title.toUpperCase());
  }



 }
