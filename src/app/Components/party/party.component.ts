import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Navigation/header/header.component';
import { Title } from '@angular/platform-browser';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { HttpClient } from '@angular/common/http';
// import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';
import { error, valHooks } from 'jquery';
import { __values } from 'tslib';
import { NotificationService } from 'src/app/Shared/service/notification.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit{


  constructor(private globalData: GlobalDataModule,
    private http : HttpClient,
    private msg : NotificationService
    ){

  }
  ngOnInit(): void{
   this.globalData.setHeaderTitle('Add Party');
   this.getParty();
   this.getCityNames();
  }




  //////////////////////////////////////////////////////
  //////////////////////getting the City Names/////////////////
  //////////////////////////////////////////////////////////////

  CitiesNames : any = []

  getCityNames(){
    this.http.get(environment.apiUrl+'api/city/getCity').subscribe(
      {
        next : value =>{
          this.CitiesNames = value;
        },
        error : error=>{
          console.log(error);
        }
      }
    )
  }
/////////////////////////////////////////////////////////////////////////



///////getting City Name for the table//////
  getCityName(id:any){

    var curcity = this.CitiesNames.find((e:any)=>{return e.cityID == id});
    return   curcity.cityName;
  }
//////////////////////////////////////////////




  searchtxt='';
  btnType = "Save";
  curPartyId= '';
  partyType = '';
  partyName = '';
  partyCNIC = '';
  partyPhoneno= '';
  partyMobileno='';
  City = '';
  partyAddress='';
  description = '';
  validate = true;


  partyData : any = [];


  getParty(){
    this.http.get(environment.apiUrl+'api/party/getParty').subscribe(
    {
      next:value =>{
        this.partyData = value;
        // console.log(value);
      
      },
      error: error=>{
        console.log(error);
      }        
      
      
    }
    )
  }


  saveParty(){
if(this.validate){
this.fieldValidation();

  if(this.btnType == "Save"){

    this.http.post(environment.apiUrl+'api/party/insertparty',{
      partyName : this.partyName,
      partyAddress : this.partyAddress,
      partyCNIC: this.partyCNIC,
      // partyAlias:'',
      type: this.partyType.toString(),
      // cityName:"",
       cityID: this.City,
       phoneNo: this.partyPhoneno,
       remarks: this.description,
       mobileNo: this.partyMobileno,
       createdBy: this.globalData.currentUserValue.userID,
 
     },{responseType:'text'}).subscribe(
       {
         next:value=>{
 
           if(value == "Data Added Successfully"){
             this.msg.SuccessNotify(value.toString());
             this.getParty();
             this.reset();
           }else{
            var noti = value;
            this.msg.WarnNotify("Not A Valid CNIC NO.");
            
           }
          
         },
         error:error=>{
           this.msg.WarnNotify(error);
           console.log(error);
         
         }
       }
     )
  }

  if(this.btnType == 'Update'){
    this.fieldValidation();
    this.http.put(environment.apiUrl+'api/party/updateparty?id='+ this.curPartyId,{

      partyName : this.partyName,
      partyAddress : this.partyAddress,
      partyCNIC: this.partyCNIC,
      // partyAlias:'',
      type: this.partyType.toString(),
      // cityName:"",
       cityID: this.City,
       phoneNo: this.partyPhoneno,
       remarks: this.description,
       mobileNo: this.partyMobileno,
       modifiedBy: this.globalData.currentUserValue.userID,  
    },{responseType:'text'}).subscribe(
      {
        next:value=>{
          if(value == 'Data Updated Succesfully'){
            this.msg.SuccessNotify(value);
            this.getParty();
            this.reset();
          }else{
            var noti = value;
            this.msg.WarnNotify("Not A Valid CNIC NO.");
          }
        },
        error:error=>{
          this.msg.WarnNotify(error);
          console.log(error);
        }
      }
    )
  }
    
  }


  }

/////////////to Set CNIC Field Formate/////////////////
  setCnicData() {
    if (
      this.partyCNIC.length == 5 ||
      this.partyCNIC.length == 13
    ) {
      this.partyCNIC = this.partyCNIC + '-';
    }
  }

  ////////////////////to Set Phone No field Formate//////////////
  setPhoneno(){
    if(this.partyPhoneno.length == 3){
      this.partyPhoneno = this.partyPhoneno + '-';
    } 
  }

  ////////////Mobile no field formate//////////////////////////
  mobileNoFormate(){
    if(this.partyMobileno.length == 4){
      this.partyMobileno = this.partyMobileno + '-';
    }
  }

  ///////////////////getting the party data for update/////////////////////

  // getPartyID(id:any){
  //   var currentParty = this.partyData.find((e :any)=>{return e.partyID == id});
  //   this.curPartyId = currentParty.partyID;
  //   this.partyType = currentParty.type;
  //   this.partyName = currentParty.partyName;
  //   this.partyCNIC = currentParty.partyCNIC;
  //   this.partyMobileno = currentParty.mobileNo;
  //   this.partyPhoneno = currentParty.phoneNo;
  //   this.partyAddress = currentParty.partyAddress;
  //   this.City = currentParty.cityID.toString();
  //   this.description = currentParty.remarks;
  //   this.btnType = "Update";

  // }
  getPartyID(item:any){

    this.curPartyId = item.partyID;
    this.partyType = item.type;
    this.partyName = item.partyName;
    this.partyCNIC = item.partyCNIC;
    this.partyMobileno = item.mobileNo;
    this.partyPhoneno = item.phoneNo;
    this.partyAddress = item.partyAddress;
    this.City = item.cityID.toString();
    this.description = item.remarks;
    this.btnType = "Update";

  }

////////////////to Delete The Party/////////////////////////
  DeleteParty(id:any){
    this.http.put(environment.apiUrl+'api/party/deleteparty?id='+id,{
      deletedBy:this.globalData.currentUserValue.userID,
    },{responseType:'text'}).subscribe(
      {
        next:value=>{
          if(value == "Party Deleted Successfully"){
            this.msg.SuccessNotify(value);
            this.getParty();

          }else{
            this.msg.WarnNotify(value);
          }
        },
        error:error=>{
          this.msg.WarnNotify(error);
          console.log(error);
        }
      }
    )
  }


  fieldValidation(){
    if(this.partyType == "" || this.partyType == undefined){
      this.msg.WarnNotify("Select The Party Type");
    }else if(this.partyName == "" || this.partyName == undefined){
      this.msg.WarnNotify("Enter The Party Name");
      
    }else if(this.partyCNIC == "" || this.partyCNIC == undefined ){
      this.msg.WarnNotify("Enter Party CNIC")
    }else if(this.partyPhoneno == "" || this.partyPhoneno == undefined){
      this.msg.WarnNotify("Enter Phone Number")
    }else if(this.partyMobileno == "" || this.partyMobileno == undefined){
      this.msg.WarnNotify("Enter Party Mobile Number")
    }else if(this.City == "" || this.City == undefined){
      this.msg.WarnNotify("Select The City")
    }else if(this.partyAddress == "" || this.partyAddress == undefined){
      this.msg.WarnNotify("Enter The Party Address")
    }else if(this.description == "" || this.description == undefined){
    this.description = "-";
  }else if(this.partyCNIC.length < 15){
    this.msg.WarnNotify("Please Enter the Valid CNIC No.")
  }else if(this.partyPhoneno.length < 11 ){
    this.msg.WarnNotify("Please Enter The Valid Phone Number");
  }else if(this.partyMobileno.length < 12){
    this.msg.WarnNotify("Please Enter the Valid Mobile NO.")
  }
  }




  reset(){
   this.partyType = '';
   this.partyName = '';
   this.partyCNIC = '';
   this.partyPhoneno = '';
   this.partyMobileno = '';
   this.City = '';
   this.partyAddress="";
   this.description = '';
   this.btnType = "Save";
  }


}
