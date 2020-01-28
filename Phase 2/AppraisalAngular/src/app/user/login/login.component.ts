import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ForgotpasswordComponent } from 'src/app/forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message : any;
  isLoginError : boolean = false;
  constructor(private dataService : DataService, private router : Router,public dialog: MatDialog) { }
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
