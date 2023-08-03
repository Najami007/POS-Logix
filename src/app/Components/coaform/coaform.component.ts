import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-coaform',
  templateUrl: './coaform.component.html',
  styleUrls: ['./coaform.component.scss']
})
export class CoaformComponent implements OnInit {

  constructor(private msg:NotificationService,
    private app:AppComponent,
    private formBuilder: FormBuilder,
    private globalData: GlobalDataModule,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Charts Of Accounts');
    this.getCoaType();
    this.GetChartOfAccount();
   
  }

  error: any;
  coaSearch:any;
  actionbtn='Save';
  txtSearch :any;
  CoaType:any; 
  coaLevel:any;
  level1='';
  level2='';
  level3='';
  level4='';
  CoaTitle:any;
  TransactionAllowed:any;
  
  


  coaTypesList:any;
  ChartsofAccountsData:any;
 
  coaLevel1List:any;
  coaLevel2List:any;
  coaLevel3List:any;
  coaLevel4List:any;

  Levels:any;

  Allow = [
    {value:true, text: 'Yes' },
    {value:false, text: 'No' },
  ]

  
  //////////////setting the value of account head level above Head Name field/////////////////

  AccountLabelHeadValue:any = '';
  setvalue(){
    
      // if(this.coaLevel== 1){
      //   this.AccountLabelHeadValue = this.levelInput ;
      // }else if(this.coaLevel == 2){
      //    if(this.levelInput == null){
      //     this.AccountLabelHeadValue = '';
      //    }
      //    this.AccountLabelHeadValue =  this.level1 + '.' + this.levelInput ;
      // }else if(this.coaLevel == 3){
      //   if(this.levelInput == null){
      //     this.AccountLabelHeadValue = '';
      //    }
      //    this.AccountLabelHeadValue = this.level1 + '.'+this.level2+ '.' + this.levelInput ;
      // }else if(this.coaLevel == 4){
      //   if(this.levelInput == null){
      //     this.AccountLabelHeadValue = '';
      //    }
      //    this.AccountLabelHeadValue = this.level1 + '.'+this.level2+ '.' +this.level3+ '.' + this.levelInput ;
      // }
  }

  

onCoaTypeChange(){
  this.Levels =[
    {value:1,level: 'level 1' },
    {value:2, level: 'level 2' },
    {value:3, level: 'level 3' },
    {value:4, level: 'level 4' },

  ];
  this.getLevel1();
  
}
onlevel1Change(){
  this.getLevel2();
}
onlevel2Change(){
  this.getLevel3();
}
onlevel3Change(){
  this.getLevel4();
}
  



  //////////////////////////// will get the coa main five types///////////////////

  getCoaType(){
    this.http.get(environment.mallApiUrl+'getcoatype').subscribe(
      {
        next:value=>{
          // console.log(value);
          this.coaTypesList = value;
        },
        error:error=>{
          console.log(error);
        }
      }
    )
  }




  //////////////////////////////////////////////////////////
  GetChartOfAccount(){
    this.http.get(environment.mallApiUrl+'GetChartOfAccount').subscribe(
      {
        next:value=>{
          // console.log(value);
          this.ChartsofAccountsData = value;
        },
        error:error=>{
          console.log(error);
        }
      }
    )
  }


  ///////////////////////////////////////

  getLevel1(){
    this.http.get(environment.mallApiUrl+'getlevel1?level0='+this.CoaType).subscribe(
      {
        next:value=>{
          console.log(value);
          this.coaLevel1List = value;
        },
        error:error=>{
          console.log(error);
        }
      }
    )
  }

  /////////////////////////////////////////////////

  getLevel2(){
    this.http.get(environment.mallApiUrl+'getlevel2?level0='+this.CoaType+'&level1='+this.level1).subscribe(
      {
        next:value=>{
          console.log(value);
          this.coaLevel2List = value;
        },
        error:error=>{
          console.log(error);
        }
      }
    )
  }


  ////////////////////////////////////
  getLevel3(){
    this.http.get(environment.mallApiUrl+'getlevel3?level0='+this.CoaType+'&level1='+this.level1+'&level2='+this.level2).subscribe(
      {
        next:value=>{
          console.log(value);
          this.coaLevel3List = value;
        },
        error:error=>{
          console.log(error);
        }
      }
    )
  }


  //////////////////////////////
  getLevel4(){
    this.http.get(environment.mallApiUrl+'getlevel4?level0='+this.CoaType+'&level1='+this.level1+'&level2='+this.level2+'&level3='+this.level3).subscribe(
      {
        next:value=>{
          console.log(value);
          this.coaLevel4List = value;
        },
        error:error=>{
          console.log(error);
        }
      }
    )
  }


  //////////////////////////save Button Functtion/////////////////////////////

  Save() {
   
    console.log(this.CoaTitle,this.CoaType,this.level1,this.level2,this.level3,this.level4,this.TransactionAllowed);
      this.http.post(environment.mallApiUrl+'InsertChartOfAccount',{
    CoaTitle: this.CoaTitle,
    CoaTypeID: this.CoaType,
    Level1: this.level1,
    Level2: this.level2,
    Level3:this.level3,
    Level4:this.level4,
    TransactionAllowed: this.TransactionAllowed,
    Editable: false,
    IsService: false,
    UserID: this.globalData.currentUserValue.userID,
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == "Data Saved Successfully"){
            this.msg.SuccessNotify(Response.msg);
          }else{
            this.msg.WarnNotify(Response.msg);
          }
        },
        (error:any)=>{
          this.error = error;
          // this.msg.WarnNotify(error);
          console.log(this.error);
        }
      )
      
    


  }

 //////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////will change the level Input field value if ///////////////////////////
  ////////////////////// value is in minue ///////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  changeValue(val:any){
    // alert(val.target.value);
    if(val.target.value < '0'){
      val.target.value = '';
    }
  }






}
