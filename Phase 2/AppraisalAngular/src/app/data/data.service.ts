import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  public getEmployeeDetails(employee: Employee): Observable<any> {
    return this.http.get( this.baseUrl + 'api/getEmployee/'+ employee.id);
  }
}
