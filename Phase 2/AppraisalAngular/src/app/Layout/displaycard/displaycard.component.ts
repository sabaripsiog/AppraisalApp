import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-displaycard',
  templateUrl: './displaycard.component.html',
  styleUrls: ['./displaycard.component.css']
})
export class DisplaycardComponent implements OnInit {
  receiver:any;
  gender:any;
  name:any;
  id:any;
  designation:any;
  doj:any;
  dob:any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.gender = localStorage.getItem('loggedInEmployeeGender');
    this.name = localStorage.getItem('loggedInEmployeeName');
this.id = localStorage.getItem('loggedInEmployeeID');
this.designation = localStorage.getItem('loggedInEmployeeDesignation');
this.dob = localStorage.getItem('loggedInEmployeeDOB');
this.doj = localStorage.getItem('loggedInEmployeeDOJ');

    }, 250);
    

    this.dataService.currentMessage.subscribe( message =>
       {
         this.receiver = message;
         this.gender = message.gender;
this.name = message.Name;
this.id = message.ID;
this.designation = message.Designation;
this.dob = message.DOB;
this.doj = message.DOJ;


    }
      );

  }
  
}
