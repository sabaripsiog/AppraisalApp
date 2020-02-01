import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ForgotpasswordComponent } from 'src/app/forgotpassword/forgotpassword.component';
import { SocialLoginModule, AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'ng4-social-login';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = SocialUser;
  message : any;
  isLoginError : boolean = false;
  constructor(private dataService : DataService,private _snackBar: MatSnackBar, private router : Router,public dialog: MatDialog, private socialAuthService : AuthService) { }
  
  facebookLogin()
  {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) =>{
    this.user = userData;
    console.log(this.user);
console.log(this.user.name);
console.log(this.user.email);
localStorage.setItem('userToken',this.user.token);
this.dataService.checkEmployeeSocialMail(this.user.email).subscribe(
 dataObject => {
  console.log(dataObject.Gender);
  this.dataService.changeMessage(dataObject);
  localStorage.setItem('loggedInEmployeeID',dataObject.ID);
  localStorage.setItem('loggedInEmployeeName',dataObject.Name);
  localStorage.setItem('loggedInEmployeeDOB',dataObject.DOB);
  localStorage.setItem('loggedInEmployeeDOJ',dataObject.DOJ);
  localStorage.setItem('loggedInEmployeeDesignation',dataObject.Designation);
  localStorage.setItem('loggedInEmployeeGender',dataObject.Gender);
  localStorage.setItem('loggedInEmployeeManagerID',dataObject.ManagerID);
  localStorage.setItem('loggedInEmployeeIsAppraiser',dataObject.IsAppraiser);
  localStorage.setItem('loggedInEmployeeIsHR',dataObject.IsHR);
  localStorage.setItem('loggedInEmployeeAppraisalStatus',dataObject.AppraisalStatus);
  this.router.navigate(['/home']);
 },err=>{
  this.openSnackBar("User not found",'Close');
  console.log(err);  
}
);
})
  
  }

  googleLogin()
  {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) =>{
    this.user = userData;
    console.log(this.user);
    console.log(this.user.name);
    console.log(this.user.email);
    localStorage.setItem('userToken',this.user.token);
    this.dataService.checkEmployeeSocialMail(this.user.email).subscribe(
     dataObject => {
      console.log(dataObject.Gender);
      this.dataService.changeMessage(dataObject);
      localStorage.setItem('loggedInEmployeeID',dataObject.ID);
      localStorage.setItem('loggedInEmployeeName',dataObject.Name);
      localStorage.setItem('loggedInEmployeeDOB',dataObject.DOB);
      localStorage.setItem('loggedInEmployeeDOJ',dataObject.DOJ);
      localStorage.setItem('loggedInEmployeeDesignation',dataObject.Designation);
      localStorage.setItem('loggedInEmployeeGender',dataObject.Gender);
      localStorage.setItem('loggedInEmployeeManagerID',dataObject.ManagerID);
      localStorage.setItem('loggedInEmployeeIsAppraiser',dataObject.IsAppraiser);
      localStorage.setItem('loggedInEmployeeIsHR',dataObject.IsHR);
      localStorage.setItem('loggedInEmployeeAppraisalStatus',dataObject.AppraisalStatus);
      this.router.navigate(['/home']);
     },err=>{
      this.openSnackBar("User not found",'Close');
      console.log(err);  
    }
    );
    })
  }

  hide = true;
  ngOnInit() {
    if(localStorage.getItem('userToken'))
    {
      this.router.navigate(['/home']);
    }
  }

  openModal()
  {
    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      width: '350px',
      height : '400px',
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

  }

  OnSubmit(userName,password){
    this.dataService.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     this.dataService.getEmployeeDetails(userName,password).subscribe(  
      dataObject => {
        console.log(dataObject.Gender);
        this.dataService.changeMessage(dataObject);
        localStorage.setItem('loggedInEmployeeID',dataObject.ID);
        localStorage.setItem('loggedInEmployeeName',dataObject.Name);
        localStorage.setItem('loggedInEmployeeDOB',dataObject.DOB);
        localStorage.setItem('loggedInEmployeeDOJ',dataObject.DOJ);
        localStorage.setItem('loggedInEmployeeDesignation',dataObject.Designation);
        localStorage.setItem('loggedInEmployeeGender',dataObject.Gender);
        localStorage.setItem('loggedInEmployeeManagerID',dataObject.ManagerID);
        localStorage.setItem('loggedInEmployeeIsAppraiser',dataObject.IsAppraiser);
        localStorage.setItem('loggedInEmployeeIsHR',dataObject.IsHR);
        localStorage.setItem('loggedInEmployeeAppraisalStatus',dataObject.AppraisalStatus);
        
       
      },
      err=>{  
        console.log("error");  
        console.log(err);  
      })
     this.router.navigate(['/home']);
   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
   });
 }


 
}
