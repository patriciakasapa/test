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
  return this.httpClient.get<Employee[]>(`${this.apiUrl}/employee/allEmployees`);
}

public getEmployee(id: number): Observable<Employee> {
  return this.httpClient.get<Employee>(`${this.apiUrl}/employee/findEmployee/${id}`);
}

public addNewEmployee(employee: Employee): Observable<Employee> {
  return this.httpClient.post<Employee>(`${this.apiUrl}/employee/addEmployee`, employee);
}

public updateEmployeeInfo(employee: Employee): Observable<Employee> {
  return this.httpClient.put<Employee>(`${this.apiUrl}/employee/updateEmployee`, employee);
}

public deleteEmployee(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.apiUrl}/employee/deleteEmployee/${id}`);
}

public OnOpenModal(employee: Employee, mode: string): void {
  const container = document.getElementById('container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'addNewEmployee') {
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  if (mode === 'update') {
    this.updateEmployee = employee;
    button.setAttribute('data-target', '#updateEmployeeModal');
  }
  if (mode === 'delete') {
   this.deleteSelectedEmployee = employee;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  container?.appendChild(button);
  button.click();
}
}
