import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';

import { MatSnackBar, MatDialogRef } from '@angular/material';

export class UserName {
  EmployeeID : string;
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: any;
  user: UserName = new UserName();
isPresent:boolean = true;
  constructor(private form: FormBuilder,private http: HttpClient,private dataservice: DataService,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<ForgotpasswordComponent>) { }

  ngOnInit() {
   
    this.forgotPasswordForm = this.form.group({
      userNAme: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
    console.log(this.forgotPasswordForm.value);
    this.user.EmployeeID =this.forgotPasswordForm.get('userNAme').value;

    this.dataservice.getUserID().subscribe(
      data =>{
        console.log(data);
        console.log( this.forgotPasswordForm.value.userNAme);
        console.log(this.user.EmployeeID);
      for(let i = 0 ; i< data.length;i++)
      {
        
        if(data[i].UserName == this.user.EmployeeID)
   {
  this.isPresent = true;
  break;
   }
   else
   {
    this.isPresent = false;
    
    
   }

      }
      
      if(this.isPresent)
      {
        this.openSnackBar("Check your mail for password reset",'Close');
       this.dataservice.postForgotForm(this.user).subscribe (
         result =>  
         {
         console.log(result);
        
         }
       );
      }
    },err=>{  
      console.log(err);  
    });
    

      
    
      
    } else {
      this.validateAllFormFields(this.forgotPasswordForm); //{7}
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
  }
  isFieldValid(field: string) {
    return !this.forgotPasswordForm.get(field).valid && (this.forgotPasswordForm.get(field).touched);
  }
  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

  }

  close()
  {
    this.dialogRef.close();
  }

}
