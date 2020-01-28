import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Password {
  Password: string;
  confirmPassword: string;
  ID : string;
}

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  forgotPasswordForm: any;
  errorMsg: string;
  pass: Password = new Password();
  id: any;
  expire: Boolean;
  submit : boolean = false;
  hideConfirm = true;
  hidePass = true;
  allow = false;
  constructor(private form: FormBuilder,private http: HttpClient,private dataservice: DataService,private route: ActivatedRoute,private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    const token=localStorage.getItem('token');
    
    if(token!=null && token){
      this.router.navigate(['/home']);
    }
    this.dataservice.getUserID().subscribe(
      data =>{
        this.id =  this.route.snapshot.params.id;
        console.log(atob(this.id));
        console.log(data);

        for(let i=0; i<data.length; i++)
        {
          if(data[i].UserName == atob(this.id))
          {
            this.allow = true;
            break;
          }
          
        }
        if(this.allow == false)
        {
          this.router.navigate(['/404']);
        }
      });
    this.forgotPasswordForm = this.form.group({
      password: ['', Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  applyFilter(filterValue: string) {
    if(this.forgotPasswordForm.get('password').value != filterValue)
    {
      this.errorMsg="Passwords Dont Match";
      this.forgotPasswordForm.value = false;
      this.submit = false;
    }
    else
    {
      this.errorMsg="Passwords Match";
      this.submit = true;
    }
  }

  applyFilterPassword(filterValue: string)
  {
    if(this.forgotPasswordForm.get('confirmPassword').valid)
    {
      if(this.forgotPasswordForm.get('confirmPassword').value != filterValue)
      {
        this.errorMsg="Passwords Dont Match";
        this.forgotPasswordForm.value = false;
        this.submit = false;
      }
      else
      {
        this.errorMsg="Passwords Match";
        this.submit = true;
      }
    }
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
    

      
      
      this.id =  this.route.snapshot.params.id;
      console.log(this.id);
      this.dataservice.updatePassword(this.forgotPasswordForm.get('password').value, this.id).subscribe();
      this.openSnackBar("Updated password successfully",'Close');
      
      setTimeout(()=>this.router.navigate(['/login']),3000);
    
    } else {
      this.validateAllFormFields(this.forgotPasswordForm); //{7}
    }
  }

  navigateToLogin()
  {
    this.router.navigate(['/login']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.router.navigate(['/login']);
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
  isFieldEqual(){
    if(this.forgotPasswordForm.get('confirmPassword').valid){
      if(this.forgotPasswordForm.get('confirmPassword').valid != this.forgotPasswordForm.get('password').valid){

        return 1;
      }
    }  
  }
  
  displayFieldCss(field: string) {
    return {  
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  updateValues(){
    this.pass.Password = this.forgotPasswordForm.get('password').value;
    this.pass.confirmPassword = this.forgotPasswordForm.get('confirmPassword').value;
    this.pass.ID = this.forgotPasswordForm.get('ID').value;
  }

}
