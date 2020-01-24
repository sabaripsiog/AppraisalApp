//app.component.ts
import { Component, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';

import { MatDialog, MatTable, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DataService } from '../data/data.service' ;
import { AppraisalGoals } from '../appraisal-goals';
import { Appraisal } from '../data/appraisal';
import { Router } from '@angular/router';
import { Employee } from '../data/employee';
import { ErrorComponent } from '../error/error.component';

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
  {goal: "Maintains standards consistently.", disable : false},
   {goal: "Produces expected volume of work in a timely manner.", disable : false},
   {goal : "Sets appropriate objectives to meet commitments within budget.", disable : false},
   {goal : "Demonstrates willingness to assume additional responsibility.", disable : false},
   {goal : "Establishes priorities. Anticipates and prepares for changing workload or working conditions.", disable : false},
   {goal: "Maintains acceptable record of attendance", disable : false}
];

const DATAARRAY2 = [
  {goal: "Maintains composure in highly stressful or adverse situations.", disable : false},
   {goal: "Increase in conversion rate and production rate", disable : false},
   {goal : "Sets appropriate objectives to meet commitments within budget. Establishes priorities and organizes workflow to meet objectives.", disable : false},
   
];

const DATAARRAY3 = [
  {goal: "Knows what FIT information or materials are sensitive and why.", disable : false},
   {goal: "Manages, leads, and enables the process of change and transition while helping others deal with the impacts.", disable : false},
   {goal : "Sets appropriate objectives to meet commitments within budget. Establishes priorities and organizes workflow to meet objectives.", disable : false},
   {goal : "Focuses on results and desired outcomes and how best to achieve them in order to get the job done", disable : false},
   {goal : "Aligns the direction, products, services, and performance of a business line with the rest of the organization.", disable : false},
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
        this.appraisalID = data.ID;
        this.dataService.getAllGoals(this.appraisalID).subscribe(
          allGoaldata => {
            
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

  openDetailModal()
  {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '300px',
      data:{
        messageGoal: true,
        
      }
    });
  }


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
    let notEmpty = true;
    let isValue = true;
    this.dataSource =  this.currentDataSource();
    for(let i=0;i<this.dataSource.length;i++)
    {
  if(this.dataSource[i].goal.includes(row_obj.goal) || row_obj.goal.includes(this.dataSource[i].goal))
  {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '300px',
      data : {
        submitError : false,
    repeatError : true
      }
    });
    isValue = false;
    break;
  }
}
if(row_obj.goal === undefined || row_obj.priority === undefined)
{
  notEmpty = false;
  console.log("empty");
}
if(notEmpty)
{
if(isValue)
  {
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
  }
}
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
this.dataArray.forEach(element => {
  if(element.goal === row_obj.goal)
  {
    element.disable = false;
  }
});
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
  obj.disable = true;
  let isValue = true;
  this.dataSource =  this.currentDataSource();
  for(let i=0;i<this.dataSource.length;i++)
  {
if(this.dataSource[i].goal.includes(obj.goal) || obj.goal.includes(this.dataSource[i].goal))
{
  const dialogRef = this.dialog.open(ErrorComponent, {
    width: '300px',
    data : {
      submitError : false,
  repeatError : true
    }
  });
  isValue = false;
  break;
}

  }
  if(isValue)
  {
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
}
  this.table.first.renderRows();
this.table.last.renderRows();

}

submitAppraisal()
{
  this.employee={
    AppraisalStatus : "Form set by Manager"
  }
  
  let isValid = true;

  if((this.performanceGoalData.length < 3) || (this.competencyGoalData.length < 3) || (this.leadershipGoalData.length < 3))
  { 
    isValid = false;
  }

  if(isValid)
  {
  this.endArray = this.performanceGoalData.concat(this.competencyGoalData,this.leadershipGoalData);
  this.employeeID = localStorage.getItem('EmployeeID');
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  
  this.dataService.getParticularAppraisal(this.employeeID).subscribe(
    data => {  
      this.endArray.forEach(element => {
      
        this.appraisalGoals.Goal = element.goal;
        this.appraisalGoals.GoalCategory_ID = element.typeID;
        this.appraisalGoals.Priority = element.priority;
        this.appraisalGoals.Appraisal_ID = data.ID;
      console.log(data);
        console.log(data.ID)
        console.log(localStorage.getItem('loggedInEmployeeIsAppraiser'));
       
       
        
        this.dataService.GetEmployee(this.LoggedEmployee).subscribe(
          newData => {this.dataService.changeMessage(newData);
          }
        );
       
        this.dataService.postEmployeeAppraisalGoals(this.appraisalGoals).subscribe();
       
        this.dataService.updateEmployeeStatus(this.employee,this.employeeID).subscribe();
        
      });
      
    
        this.dataService.postPDF(data.ID, localStorage.getItem('loggedInEmployeeIsAppraiser')).subscribe();
        this.dataService.postPDF(data.ID, localStorage.getItem('loggedInEmployeeIsAppraiser')).subscribe();
        localStorage.setItem('loggedInEmployeeAppraisalStatus',"Form set by Manager");
        setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
      
      
    } 
  )
  }
  else
  {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '300px',
      data : {
        setError : true,
    repeatError : false
      }
    });
  }
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
  let allowSubmit = true;
  for(let i=0;i<this.endArray.length;i++)
  {
    if(this.endArray[i].employeeComments === null || this.endArray[i].employeeRating === null || this.endArray[i].employeeComments === "" || this.endArray[i].employeeRating === "")
    {
      allowSubmit = false;
      break;
    }
  }
  if(allowSubmit)
  {
  this.employeeID = localStorage.getItem('EmployeeID');
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  console.log('sab2');
  this.dataService.getParticularAppraisal(this.employeeID).subscribe(
    data => {  
      this.endArray.forEach(element => {
      
        this.appraisalGoals.Goal = element.goal;
        this.appraisalGoals.GoalCategory_ID = element.typeID;
        this.appraisalGoals.Priority = element.priority;
        this.appraisalGoals.Appraisal_ID = data.ID;
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
     
        this.dataService.postPDF(data.ID, localStorage.getItem('loggedInEmployeeIsAppraiser')).subscribe();
        this.dataService.postPDF(data.ID, localStorage.getItem('loggedInEmployeeIsAppraiser')).subscribe();
        localStorage.setItem('loggedInEmployeeAppraisalStatus',"Form submitted by Employee");
        setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
      
    }
    
  );
 
}
else
{
  const dialogRef = this.dialog.open(ErrorComponent, {
    width: '300px',
    data : {
      submitError : true,
  repeatError : false
    }
  });
}
}

submitFinalAppraisal()
{
  this.employee={
    AppraisalStatus : "Completed"
  }
  console.log('sab');
  this.endArray = this.performanceGoalData.concat(this.competencyGoalData,this.leadershipGoalData);
  console.log(this.endArray);
  let allowSubmit = true;
  for(let i=0;i<this.endArray.length;i++)
  {
    if(this.endArray[i].managerComments === null || this.endArray[i].managerRating === null || this.endArray[i].managerRating === "" || this.endArray[i].managerComments === "")
    {
      allowSubmit = false;
      break;
    }
  }
  if(allowSubmit)
  {
  this.employeeID = localStorage.getItem('EmployeeID');
  this.LoggedEmployee = localStorage.getItem('loggedInEmployeeID');
  console.log('sab2');
  this.dataService.getParticularAppraisal(this.employeeID).subscribe(
    data => {  
      this.endArray.forEach(element => {
      
        this.appraisalGoals.Goal = element.goal;
        this.appraisalGoals.GoalCategory_ID = element.typeID;
        this.appraisalGoals.Priority = element.priority;
        this.appraisalGoals.Appraisal_ID = data.ID;
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
     
        this.dataService.postPDF(data.ID, localStorage.getItem('loggedInEmployeeIsAppraiser')).subscribe();
       
        localStorage.setItem('loggedInEmployeeAppraisalStatus',"Completed");
        setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
     
    } 
  );
 
}

else
{
  const dialogRef = this.dialog.open(ErrorComponent, {
    width: '300px',
    data : {
      submitError : true,
  repeatError : false
    }
  });
}
}

}



