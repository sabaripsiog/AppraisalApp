//app.component.ts
import { Component, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';

import { MatDialog, MatTable, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DataService } from '../data/data.service' ;
import { AppraisalGoals } from '../appraisal-goals';
import { Appraisal } from '../data/appraisal';
import { Router } from '@angular/router';
import { Employee } from '../data/employee';

export interface Goals {
  goal: string;
  id: number;
  priority : number;
  typeID : number;
  tableID : number;
  managerComments : string;
  managerRating : string;
  employeeComments : string;
  employeeRating : string;
}

export interface Ratings {
  value: string;
  viewValue: string;
}


const DATAARRAY1 = [
  {goal: "Maintains standards consistently. Is consistent in achieving accuracy, neatness, thoroughness, overall effectiveness and attentiveness to detail"},
   {goal: "Produces expected volume of work in a timely manner."},
   {goal : "Sets appropriate objectives to meet commitments within budget. Establishes priorities and organizes workflow to meet objectives."},
   {goal : "Demonstrates willingness to assume additional responsibility."},
   {goal : "Establishes priorities. Anticipates and prepares for changing workload or working conditions."},
   {goal: "Maintains acceptable record of attendance"}
];

const DATAARRAY2 = [
  {goal: "Maintains composure in highly stressful or adverse situations."},
   {goal: "Increase in conversion rate and production rate"},
   {goal : "Sets appropriate objectives to meet commitments within budget. Establishes priorities and organizes workflow to meet objectives."},
   
];

const DATAARRAY3 = [
  {goal: "Knows what FIT information or materials are sensitive and why."},
   {goal: "Manages, leads, and enables the process of change and transition while helping others deal with the impacts."},
   {goal : "Sets appropriate objectives to meet commitments within budget. Establishes priorities and organizes workflow to meet objectives."},
   {goal : "Focuses on results and desired outcomes and how best to achieve them in order to get the job done"},
   {goal : "Aligns the direction, products, services, and performance of a business line with the rest of the organization."},
];


const GOALCATEGORIES = [
  {categoryID : 1, category: 'Performance'},
  {categoryID : 2, category: 'Competency'},
  {categoryID : 3, category: 'Leadership'},
]

@Component({
  selector: 'app-goallist',
  templateUrl: './goallist.component.html',
  styleUrls: ['./goallist.component.css']
})
export class GoallistComponent{
  LoggedEmployee: any;

  constructor(public dataService: DataService,public dialog: MatDialog, public router:Router) {} 
  showContent: boolean = false;
  performanceGoalData: Goals[] = [];
  competencyGoalData: Goals[] = [];
  leadershipGoalData: Goals[] = [];
  employeeID : any;
  name :any;
  Designation : any;
  doj : any;
  dob : any;
  appraisalStatus : any;
  endArray : Array<any>;
  dataArray = DATAARRAY1;
  employee:object;
  appraisalID : number;
source : any;
displayedColumns: string[] = ['id', 'name', 'priority','action'];
ViewDisplayedColumns: string[] = ['id', 'name', 'priority'];
FillDisplayedColumns: string[] = ['id', 'name', 'rating','comments'];
FinalColumns: string[] = ['id', 'name', 'priority','e-rating','e-comments','m-rating','m-comments'];
pageNumber: number;
dataSource : Goals[] = [];
categories = GOALCATEGORIES;
appraisal : Appraisal;
appraisalGoals:AppraisalGoals = new AppraisalGoals();
isAccessHR : any;
isAccessAppraiser : any;
startID: number = 1;
ratings: Ratings[] = [
  {value: 'A+', viewValue: 'A+'},
  {value: 'A', viewValue: 'A'},
  {value: 'B+', viewValue: 'B+'},
  {value: 'B', viewValue: 'B'},
  {value: 'C', viewValue: 'C'}
];
  ngOnInit(){
    setTimeout(()=>this.showContent=true, 100);
    this.isAccessAppraiser = localStorage.getItem('loggedInEmployeeIsAppraiser');
    console.log(this.isAccessAppraiser);
    this.pageNumber = 1;
    this.dataSource =  this.currentDataSource();
    this.employeeID = localStorage.getItem('EmployeeID');
    this.name = localStorage.getItem('EmployeeName');
    this.Designation = localStorage.getItem('EmployeeDesignation');
    this.dob = localStorage.getItem('EmployeeDOB');
    this.doj = localStorage.getItem('EmployeeDOJ');
    this.appraisalStatus = localStorage.getItem('EmployeeAppraisalStatus');
    if(this.appraisalStatus != "Initiated by HR")
    {
    this.dataService.getParticularAppraisal(this.employeeID).subscribe(
      data => { 
        this.appraisalID = data[0].ID;
        this.dataService.getAllGoals(this.appraisalID).subscribe(
          allGoaldata => {
            console.log(allGoaldata);
            allGoaldata.forEach(goal => {
              if(goal.GoalCategory_ID == 1)
              {
                this.performanceGoalData.push({
                    goal: goal.Goal,
                    id: this.performanceGoalData.length+1,
                    priority : goal.Priority,
                    typeID: goal.GoalCategory_ID,
                    tableID: goal.ID,
                    managerComments:goal.ManagerComments,
                    managerRating:goal.ManagerRating,
                    employeeComments:goal.EmployeeComments,
                    employeeRating:goal.EmployeeRating
                });
              }
              
              else if(goal.GoalCategory_ID == 2)
              {
                this.competencyGoalData.push({
                    goal: goal.Goal,
                    id: this.competencyGoalData.length+1,
                    priority : goal.Priority,
                    typeID: goal.GoalCategory_ID,
                    tableID: goal.ID,
                    managerComments:goal.ManagerComments,
                    managerRating:goal.ManagerRating,
                    employeeComments:goal.EmployeeComments,
                    employeeRating:goal.EmployeeRating
                });
              }
              else if(goal.GoalCategory_ID == 3)
              {
                this.leadershipGoalData.push({
                    goal: goal.Goal,
                    id: this.leadershipGoalData.length+1,
                    priority : goal.Priority,
                    typeID: goal.GoalCategory_ID,
                    tableID: goal.ID,
                    managerComments:goal.ManagerComments,
                    managerRating:goal.ManagerRating,
                    employeeComments:goal.EmployeeComments,
                    employeeRating:goal.EmployeeRating
                });
              }
              
            });
           
          }
        )
      });
    }
}
 

  @ViewChildren(MatTable) table !: QueryList<MatTable<any>>;

  

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    this.dataSource =  this.currentDataSource();
    this.dataSource.push({
      id: this.dataSource.length + 1,
      goal:row_obj.goal,
      priority:row_obj.priority,
      typeID:this.pageNumber,
      tableID: null,
      managerComments:null,
      managerRating:null,
      employeeComments:null,
      employeeRating:null
    });
    this.table.first.renderRows();
this.table.last.renderRows();
  }

  updateRowData(row_obj){
    this.dataSource = this.currentDataSource();
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.goal = row_obj.goal;
        value.priority = row_obj.priority;
      }
      return true;
    });
  }

  deleteRowData(row_obj){
    this.dataSource = this.currentDataSource();
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        this.dataSource.splice(this.dataSource.indexOf(this.dataSource[row_obj.id - 1]),1);
      }
      this.startID = 1;
      for(let i=0; i<this.dataSource.length;i++)
    {
      
      this.dataSource[i].id = this.startID;
      this.startID++;
      console.log(this.dataSource[i].id);
    }
    });
   
    this.table.first.renderRows();
this.table.last.renderRows();
  }

saveAndNext()
{
  
    
  
  this.pageNumber = this.pageNumber+1;
  this.dataSource =  this.currentDataSource();
}

saveComments()
{
  this.pageNumber = this.pageNumber+1;
  this.dataSource =  this.currentDataSource();

}

goPreviousPage()
{
  this.pageNumber = this.pageNumber-1;
  this.dataSource =  this.currentDataSource();
}

currentDataSource()
{
  if(this.pageNumber == 1)
    {
      this.dataArray = DATAARRAY1;
    return this.performanceGoalData;
    }
  else if(this.pageNumber == 2)
  {
    this.dataArray = DATAARRAY2;
    return this.competencyGoalData;
  }
  else if(this.pageNumber == 3)
  {
    this.dataArray = DATAARRAY3;
    return this.leadershipGoalData;
  }
}

addSuggestion(obj)
{
  this.dataSource =  this.currentDataSource();
  this.dataSource.push({
    id: this.dataSource.length + 1,
    goal:obj.goal,
    priority: 4,
    typeID:this.pageNumber,
    tableID: null,
    managerComments:null,
    managerRating:null,
    employeeComments:null,
    employeeRating:null
  });
  this.table.first.renderRows();
this.table.last.renderRows();

}

submitAppraisal()
{
  this.employee={
    AppraisalStatus : "Form set by Manager"
  }
  this.endArray = this.performanceGoalData.concat(this.competencyGoalData,this.leadershipGoalData)


  this.employeeID = localStorage.getItem('EmployeeID');
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  
  this.dataService.getParticularAppraisal(this.employeeID).subscribe(
    data => {  
      this.endArray.forEach(element => {
      
        this.appraisalGoals.Goal = element.goal;
        this.appraisalGoals.GoalCategory_ID = element.typeID;
        this.appraisalGoals.Priority = element.priority;
        this.appraisalGoals.Appraisal_ID = data[0].ID;

        this.dataService.GetEmployee(this.LoggedEmployee).subscribe(
          newData => {this.dataService.changeMessage(newData);
          }
        );
        this.dataService.postEmployeeAppraisalGoals(this.appraisalGoals).subscribe();
        
        this.dataService.updateEmployeeStatus(this.employee,this.employeeID).subscribe();
        localStorage.removeItem('EmployeeID');
        localStorage.removeItem('EmployeeName');
        localStorage.removeItem('EmployeeDesignation');
        localStorage.removeItem('EmployeeDOB');
        localStorage.removeItem('EmployeeDOJ');
        localStorage.removeItem('EmployeeAppraisalStatus');
        this.router.navigate(['/home']);
      });
    } 
  )

}

goBack()
{
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  this.dataService.GetEmployee(this.LoggedEmployee).subscribe(
    newData => {this.dataService.changeMessage(newData);
    }
  );
  this.router.navigate(['/home']);
}

submitByEmployee()
{
  this.employee={
    AppraisalStatus : "Form submitted by Employee"
  }
  console.log('sab');
  this.endArray = this.performanceGoalData.concat(this.competencyGoalData,this.leadershipGoalData);
  console.log(this.endArray);
  this.employeeID = localStorage.getItem('EmployeeID');
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  console.log('sab2');
  this.dataService.getParticularAppraisal(this.employeeID).subscribe(
    data => {  
      this.endArray.forEach(element => {
      
        this.appraisalGoals.Goal = element.goal;
        this.appraisalGoals.GoalCategory_ID = element.typeID;
        this.appraisalGoals.Priority = element.priority;
        this.appraisalGoals.Appraisal_ID = data[0].ID;
        this.appraisalGoals.EmployeeComments = element.employeeComments;
        this.appraisalGoals.EmployeeRating = element.employeeRating;
        this.appraisalGoals.ManagerComments = element.managerComments;
        this.appraisalGoals.ManagerRating = element.managerRating;
        console.log(this.appraisalGoals);
console.log("array");
       this.dataService.GetEmployee(this.LoggedEmployee).subscribe(
          newData => {this.dataService.changeMessage(newData);
          }
        );
        this.dataService.updateEmployeeAppraisalGoals(this.appraisalGoals, element.tableID).subscribe();
        
        this.dataService.updateEmployeeStatus(this.employee,this.employeeID).subscribe();
        
      });
      localStorage.setItem('loggedInEmployeeAppraisalStatus',"Form submitted by Employee");
      localStorage.removeItem('EmployeeID');
        localStorage.removeItem('EmployeeName');
        localStorage.removeItem('EmployeeDesignation');
        localStorage.removeItem('EmployeeDOB');
        localStorage.removeItem('EmployeeDOJ');
        localStorage.removeItem('EmployeeAppraisalStatus');
        this.router.navigate(['/home']);
    } 
  )
}

submitFinalAppraisal()
{
  this.employee={
    AppraisalStatus : "Completed"
  }
  console.log('sab');
  this.endArray = this.performanceGoalData.concat(this.competencyGoalData,this.leadershipGoalData);
  console.log(this.endArray);
  this.employeeID = localStorage.getItem('EmployeeID');
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  console.log('sab2');
  this.dataService.getParticularAppraisal(this.employeeID).subscribe(
    data => {  
      this.endArray.forEach(element => {
      
        this.appraisalGoals.Goal = element.goal;
        this.appraisalGoals.GoalCategory_ID = element.typeID;
        this.appraisalGoals.Priority = element.priority;
        this.appraisalGoals.Appraisal_ID = data[0].ID;
        this.appraisalGoals.EmployeeComments = element.employeeComments;
        this.appraisalGoals.EmployeeRating = element.employeeRating;
        this.appraisalGoals.ManagerComments = element.managerComments;
        this.appraisalGoals.ManagerRating = element.managerRating;
        console.log(this.appraisalGoals);
console.log("array");
       this.dataService.GetEmployee(this.LoggedEmployee).subscribe(
          newData => {this.dataService.changeMessage(newData);
          }
        );
        this.dataService.updateEmployeeAppraisalGoals(this.appraisalGoals, element.tableID).subscribe();
        
        this.dataService.updateEmployeeStatus(this.employee,this.employeeID).subscribe();
        
      });
      localStorage.removeItem('EmployeeID');
        localStorage.removeItem('EmployeeName');
        localStorage.removeItem('EmployeeDesignation');
        localStorage.removeItem('EmployeeDOB');
        localStorage.removeItem('EmployeeDOJ');
        localStorage.removeItem('EmployeeAppraisalStatus');
        this.router.navigate(['/home']);
    } 
  )
}
}





