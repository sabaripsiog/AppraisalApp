import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ErrorData {
  submitError : boolean,
  repeatError : boolean,
  setError : boolean
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  
  errorData : any;
  constructor( public dialogRef: MatDialogRef<ErrorComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ErrorData) { 
      this.errorData =  {...data};
    }

  ngOnInit() {
    
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
