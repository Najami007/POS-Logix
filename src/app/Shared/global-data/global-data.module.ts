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
import * as $ from 'jquery';


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






  //////////////////////////print Funciton /////////////////////////////////


  printData(printSection: string) {
    var contents = $(printSection).html();

    var frame1:any = $('<iframe />');
    frame1[0].name = 'frame1';
    frame1.css({ position: 'absolute', top: '-1000000px' });
    $('body').append(frame1);
    var frameDoc = frame1[0].contentWindow
      ? frame1[0].contentWindow
      : frame1[0].contentDocument.document
      ? frame1[0].contentDocument.document
      : frame1[0].contentDocument;
    frameDoc.document.open();

    //Create a new HTML document.
    // frameDoc.document.write(
    //   "<html><head><title>DIV Contents</title>" +
    //     "<style>" +
    //     printCss +
    //     "</style>"
    // );

    //Append the external CSS file. <link rel="stylesheet" href="../../../styles.scss" /> <link rel="stylesheet" href="../../../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
    frameDoc.document.write(
      '<style type="text/css" media="print">@page { size: portrait; }</style>'
    );
    frameDoc.document.write(
      // '<link rel="stylesheet" href="../../../../../../apps/society/src/styles.scss" type="text/scss"  media="print"/>'
      // '<link rel="stylesheet" href="../../../../../ui/src/lib/styles/print/styles.css" type="text/css"  media="print"/>'
      // '<link rel="stylesheet" href="../styles.css" type="text/css"  media="print"/>'
      '<link rel="stylesheet" href="../../assets/style/ownStyle.css" type="text/css" media="print"/>'+
      '<link rel="stylesheet" href="../../assets/style/bootstrap.min.css" type="text/css" media="print"/>'
      // '<link rel="stylesheet" href="../css/bootstrap.css" type="text/css"  media="print"/>'
    );
    frameDoc.document.write('</head><body>');

    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');

    frameDoc.document.close();

    setTimeout(function () {
      window.frames[0].focus();
      window.frames[0].print();

      frame1.remove();
    }, 500);
  }




  /////////////////////////////////////////////////////////////
/////////////////////////////fotmate date in year-month-day formate///////
/////////////////////////////////////////////////////////////////////

  dateFormater(date:Date, separator:any) {
    var day:any = date.getDate();
    // add +1 to month because getMonth() returns month from 0 to 11
    var month:any = date.getMonth() + 1;
    var year = date.getFullYear();
  
    // show date and month in two digits
    // if month is less than 10, add a 0 before it
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
  
    // now we have day, month and year
    // use the separator to join them
    return year + separator + month + separator + day;
  }







 }
