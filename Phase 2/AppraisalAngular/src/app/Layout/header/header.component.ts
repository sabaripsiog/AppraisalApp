import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
employeeObject : any;
showHeader = true;
showToggle : any;
color = 'warn';
checked = false;
employeeName : any;
  mySubscription: any;
  constructor(private router: Router,private dataService : DataService) { 
    
  }
 
  
 
  ngOnInit() {
    this.employeeName = localStorage.getItem('loggedInEmployeeName');
    this.dataService.currentMessage.subscribe( data =>{
      console.log(data);
      this.employeeName = data.Name;
      if(data.IsAppraiser == 'True' && data.IsHR == 'False')
      this.showToggle = 'True';
    });
    
  }
 
  goHome()
  {
    console.log('asas');
    this.dataService.currentMessage.subscribe( data =>{
      console.log(data);
      
    })
   
    this.router.navigate(['/home']);
  }
  
  getHelp()
  {
    this.router.navigate(['/help']);
  }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('loggedInEmployeeID');
    localStorage.removeItem('loggedInEmployeeName');
    localStorage.removeItem('loggedInEmployeeDOB');
    localStorage.removeItem('loggedInEmployeeDOJ');
    localStorage.removeItem('loggedInEmployeeDesignation');
    localStorage.removeItem('loggedInEmployeeGender');
    localStorage.removeItem('loggedInEmployeeManagerID');
    localStorage.removeItem('loggedInEmployeeIsAppraiser');
    localStorage.removeItem('loggedInEmployeeIsHR');
    localStorage.removeItem('loggedInEmployeeAppraisalStatus');
    localStorage.removeItem('appraiserToggle');
    localStorage.removeItem('ManagerToggle');
    this.router.navigate(['/login']);
  }
 
}
