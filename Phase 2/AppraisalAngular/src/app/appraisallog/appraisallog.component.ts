import {Component, OnInit, ViewChild} from '@angular/core';
import { from, Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Employee } from '../data/employee';
import { HttpClient } from '@angular/common/http';
import {formatDate } from '@angular/common';
import { Appraisal } from '../data/appraisal'
import { Router } from '@angular/router';
import { ViewComponent } from '../view/view.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-appraisallog',
  templateUrl: './appraisallog.component.html',
  styleUrls: ['./appraisallog.component.css']
})
export class AppraisallogComponent implements OnInit{
  displayedColumns: string[] = ['Name', 'Designation', 'DOJ', 'Manager', 'AppraisalStatus'];
  ManagerColumns: string[] = ['Name', 'Designation', 'DOJ', 'AppraisalStatus','Form'];
  dataSource = new MatTableDataSource<Employee[]>();
  AppraisalSource = new MatTableDataSource<Employee[]>();
  currentDate = new Date();
  appraisal: Appraisal = new Appraisal();
  message:any;
  isHR : any;
  isAppraiser : any;
  show : boolean = false;
  toggle : any;
  appraisalStatus: any;
  id : any;
  ngOnInit() {
   
    this.isAppraiser = localStorage.getItem('loggedInEmployeeIsAppraiser');
    this.isHR = localStorage.getItem('loggedInEmployeeIsHR');
this.appraisalStatus = localStorage.getItem('loggedInEmployeeAppraisalStatus');
this.id = localStorage.getItem('loggedInEmployeeID');
this.http.get<Employee[]>('https://localhost:44373/api/GetMyEmployees?'+'id='+ this.id).subscribe(  
        newData => {  this.AppraisalSource = new  MatTableDataSource(newData) as any ;

      }  
        ,err=>{  
          console.log(err);  
        });
    this.dataService.currentMessage.subscribe( message => {this.message = message;
    
      this.isAppraiser = this.message.IsAppraiser;
      this.isHR = this.message.IsHR;
      this.appraisalStatus = this.message.AppraisalStatus;
      this.id = this.message.ID;
      this.http.get<Employee[]>('https://localhost:44373/api/GetMyEmployees?'+'id='+ this.id).subscribe(  
        newData => {  this.AppraisalSource = new  MatTableDataSource(newData) as any ;

      }  
        ,err=>{  
          console.log(err);  
        });
  },err=>{  
    console.log(err);  
  });
    this.http.get<Employee[]>('https://localhost:44373/api/GetDetails').subscribe(  
      data => {  this.dataSource = new  MatTableDataSource(data) as any ;
      
    }  
      ,err=>{  
        console.log(err);  
      });
      setTimeout(() => {
        this.show = true;
    }, 100);
    console.log("FinalScore = "+ localStorage.getItem('finalscore')); 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.AppraisalSource.filter = filterValue.trim().toLowerCase();
  }

  openDetailModal()
  {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '300px',
      data:{
        messageLog: true,
        
      }
    });
  }


     InitiateProcess(obj){
       if(obj.AppraisalStatus == "Yet to initiate")
       {
       obj.AppraisalStatus = "Initiated by HR";
       this.appraisal.StartDate = this.currentDate;
      this.appraisal.EndDate = null;
      this.appraisal.Status = 'Initiated by HR';
      this.appraisal.Employee_ID = obj.ID;
      
       this.dataService.updateEmployee(obj).subscribe();
       this.dataService.postRegisterForm(this.appraisal).subscribe();
       }
    }
    
passEmployeeDetails(obj)
{
  localStorage.setItem('EmployeeID', obj.ID);
  localStorage.setItem('EmployeeName', obj.Name);
  localStorage.setItem('EmployeeDesignation', obj.Designation);
  localStorage.setItem('EmployeeDOB', obj.DOB);
  localStorage.setItem('EmployeeDOJ', obj.DOJ);
  localStorage.setItem('EmployeeAppraisalStatus', obj.AppraisalStatus);
  this.router.navigate(['/form']);
}

takeEmployeetoForm()
{
  localStorage.setItem('EmployeeID', localStorage.getItem('loggedInEmployeeID'));
  localStorage.setItem('EmployeeName', localStorage.getItem('loggedInEmployeeName'));
  localStorage.setItem('EmployeeDesignation', localStorage.getItem('loggedInEmployeeDesignation'));
  localStorage.setItem('EmployeeDOB', localStorage.getItem('loggedInEmployeeDOB'));
  localStorage.setItem('EmployeeDOJ', localStorage.getItem('loggedInEmployeeDOJ'));
  localStorage.setItem('EmployeeAppraisalStatus', localStorage.getItem('loggedInEmployeeAppraisalStatus'));
  this.router.navigate(['/form']);
}

openViewDialog(obj)
{
  const dialogRef = this.dialog.open(ViewComponent, {
    width: '700px',
    height : '500px',
    data : obj
  });
}

openViewDialogEmployee()
{
  console.log(localStorage.getItem('loggedInEmployeeName'));
  const dialogRef = this.dialog.open(ViewComponent, {
    width: '700px',
    height : '500px',
    data : {
      name : localStorage.getItem('loggedInEmployeeName')
    }
  });
}


@ViewChild('hBSort',{static: false}) hBSort: MatSort;
@ViewChild('sBSort',{static: false}) sBSort: MatSort;

  constructor(private dataService : DataService,private http:HttpClient,private router : Router,public dialog: MatDialog){}
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.sort = this.hBSort;
      this.AppraisalSource.sort = this.sBSort;
    },1000);
  }
}






