import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Appraisal } from './appraisal';
import { AppraisalGoals } from '../appraisal-goals';

export class UserName {
  EmployeeID: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;
  isHR : boolean;
  isAppraiser : boolean;
  url : string;
  private messageSource = new Subject<any>();
  currentMessage = this.messageSource.asObservable();

  private dataSource = new Subject<any>();
  currentSource = this.dataSource.asObservable();
  

  constructor(private http:HttpClient) { }

  public getEmployeeDetails(userName, password): Observable<any> {
    return this.http.get( this.baseUrl + 'api/GetEmployeeDetails?username='+ userName + "&&password=" + password);
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.baseUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return  this.http.get(this.baseUrl+'/api/GetUserClaims');
   }

   changeMessage(message: any) {
    this.messageSource.next(message);
  }

   clearMessage(): void {
        // clear message
        this.messageSource.next();
    }

  changeSource(source : any)
  {
    this.dataSource.next(source);
  }

  public getParticularAppraisal(id : string): Observable<any>
  {
    return this.http.get<Appraisal>( this.baseUrl + 'api/GetParticularAppraisal?id='+ id);
  }
   
  public postRegisterForm(appraisal:Appraisal): Observable<any> {
    
    return this.http.post('https://localhost:44373/api/PostAppraisalList', appraisal);
  }

  public postEmployeeAppraisalGoals(appraisalGoal:AppraisalGoals): Observable<any> {
    
    return this.http.post('https://localhost:44373/api/postEmployeeAppraisalGoals', appraisalGoal);
  }

  public updateEmployeeAppraisalGoals(appraisalGoal:AppraisalGoals, id : number): Observable<any> {
    
    return this.http.put('https://localhost:44373/api/updateEmployeeAppraisalGoals/'+id, appraisalGoal);
  }

  public updateEmployee(employee: Employee): Observable<any> {
   
    return this.http.put('https://localhost:44373/api/UpdateEmployee/'+ employee.ID, employee);
  }

  public updateEmployeeStatus(employee:object,id: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 

    return this.http.put('https://localhost:44373/api/UpdateEmployeeStatus/'+ id, employee, httpOptions);
  }

  public GetEmployee(id : string): Observable<any>
  {
    return this.http.get( this.baseUrl + 'api/getEmployee/'+ id);
  }

  public getAllGoals(id : number): Observable<any>
  {
    return this.http.get( this.baseUrl + 'api/getAllGoals/'+ id);
  }

  public postPDF(id : number,role : string): Observable<any>
  {
    let name = localStorage.getItem('EmployeeName');
    let designation = localStorage.getItem('EmployeeDesignation');
    let doj = localStorage.getItem('EmployeeDOJ');
    console.log(name);
    console.log(designation);
    return this.http.get( this.baseUrl + 'api/viewPDF/'+ id +'?role='+role+'&&name='+name+'&&designation='+designation+'&&doj='+doj);
  }


  public getUserID(): Observable<any>
  {
    return this.http.get( this.baseUrl + 'api/getUsernames');
  }

  public postForgotForm(UserName: UserName): Observable<any> {
    return this.http.post( this.baseUrl + 'api/forgot',UserName);
  }
  public updatePassword(password : string,id: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    console.log(password);
    console.log(id);

    return this.http.put(this.baseUrl + 'api/UpdatePassword/'+ id + '?password=' + password,httpOptions);
  }
}
