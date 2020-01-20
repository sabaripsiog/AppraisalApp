//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface UsersData {
  goal: string;
  id: number;
  priority:number;
}

export interface Priority {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
isEmpty : boolean;
  action:string;
  local_data:any;

  priorities: Priority[] = [
    {value: 4, viewValue: 4},
    {value: 3, viewValue: 3},
    {value: 2, viewValue: 2},
    {value: 1, viewValue: 1}
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    if(this.local_data.goal === undefined || this.local_data.priority === undefined)
    {
      this.isEmpty = true;
    }
    else
    {
    this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  changePriority(value)
  {
    this.local_data.priority = value;
  }

}

