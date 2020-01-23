import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface employeeData {
  Name : string
}


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})




export class ViewComponent implements OnInit {
  isAppraisee: string;
  managerSource: any;
  employeeSource: string;
  employee : any;
  
  constructor( public dialogRef: MatDialogRef<ViewComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: employeeData) { 
      this.employee =  {...data};
      console.log(this.employee.name);
      console.log(this.employee.Name);
      this.managerSource = "../Appraiser-View-"+ this.employee.Name +".pdf";
      this.employeeSource = "../Appraisee-View-"+ this.employee.name +".pdf";
    }
  ngOnInit() {
    this.isAppraisee = localStorage.getItem('loggedInEmployeeIsAppraiser');
  
   
  }

  exit()
  {
    this.dialogRef.close();
  }
}
