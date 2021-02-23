import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test';
  
  public employees: Employee[] = [];
  public updateEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    },
    (httpError: HttpErrorResponse) => {
      alert(httpError.message);
    });
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployeeInfo(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.emailAddress.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.department.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.role.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getAllEmployees();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void {
   this.employeeService.OnOpenModal(employee, mode)
  }

}
