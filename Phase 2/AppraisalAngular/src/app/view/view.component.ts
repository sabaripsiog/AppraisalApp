import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  isAppraisee: string;

  constructor( public dialogRef: MatDialogRef<ViewComponent>,) { }

  ngOnInit() {
    this.isAppraisee = localStorage.getItem('loggedInEmployeeIsAppraiser');
   
  }

  exit()
  {
    this.dialogRef.close();
  }
}
