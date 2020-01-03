import {Component, OnInit} from '@angular/core';
import { from, Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { MatTableDataSource } from '@angular/material';
import { Employee } from '../data/employee';
import { HttpClient } from '@angular/common/http';
import {formatDate } from '@angular/common';
import { Appraisal } from '../data/appraisal'

@Component({
  selector: 'app-appraisallog',
  templateUrl: './appraisallog.component.html',
  styleUrls: ['./appraisallog.component.css']
})
export class AppraisallogComponent implements OnInit{
  displayedColumns: string[] = ['Name', 'Designation', 'DateofJoining', 'Manager', 'AppraisalStatus'];
  dataSource = new MatTableDataSource();
  AppraisalSource = new MatTableDataSource();
  currentDate = new Date();
  appraisal: Appraisal = new Appraisal();
  public showButton = true;
  public hideButton = false;
  
  ngOnInit() {
    this.httpService.get<Employee[]>('https://localhost:44324/api/GetDetails').subscribe(  
      data => {  this.dataSource = new  MatTableDataSource(data) as any ;
      console.log(this.dataSource);
      console.log("Before for loop");
    
      for (let i = 0; i < data.length; i++) 
      {
        console.log(data);
      this.appraisal.StartDate = this.currentDate;
      this.appraisal.EndDate = null;
      this.appraisal.Status = 'Initiate';
      this.appraisal.EmployeeID = data[i].id;
      if(data[i].AppraisalStatus == "Initiate")
      {
      this.postRegisterForm(this.appraisal).subscribe();
      }
      }
    }  
      ,err=>{  
        console.log(err);  
      })
    }

     InitiateProcess(obj){
       if(obj.AppraisalStatus != "Initiate")
       {
       obj.AppraisalStatus = "Initiated";
       this.updateEmployee(obj).subscribe();
       }
    }
    public postRegisterForm(appraisal:Appraisal): Observable<any> {
      console.log("Entered the post method");
      return this.httpService.post('https://localhost:44324/api/PostAppraisalList', appraisal);
    }

    public updateEmployee(employee: Employee): Observable<any> {
      console.log("Entered the update method");
      return this.httpService.put('https://localhost:44324/api/UpdateEmployee/'+ employee.id, employee);
    }

  constructor(private httpService: HttpClient) {}
  
}






