import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private apiUrl = environment.APIURL;
public employees: Employee[] = [];
public updateEmployee!: Employee;
  public deleteSelectedEmployee!: Employee;

  constructor(private httpClient: HttpClient) { }

  GetEmployees(){
    this.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    },
    (httpError: HttpErrorResponse) => {
      alert(httpError.message);
    });
  }

 public getAllEmployees(): Observable<Employee[]> {
  return this.httpClient.get<Employee[]>(`${this.apiUrl}/api/employees`);
}

public getEmployee(id: number): Observable<Employee> {
  return this.httpClient.get<Employee>(`${this.apiUrl}/api/employees/${id}`);
}

public addNewEmployee(employee: Employee): Observable<Employee> {
  return this.httpClient.post<Employee>(`${this.apiUrl}/api/employees`, employee);
}

public updateEmployeeInfo(id: number, employee: Employee): Observable<Employee> {
  return this.httpClient.put<Employee>(`${this.apiUrl}/api/employees/${id}`, employee);
}

public deleteEmployee(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.apiUrl}/api/employees/${id}`);
}
}
