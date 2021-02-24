import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { Router } from '@angular/router';
import { Employee } from './services/employee';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test';

  public employees: Employee[] = [];
  public focusedEmployee!: Employee;
  formGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailAddress: ['', Validators.required],
    department: ['', Validators.required],
    role: ['', Validators.required],
    imageUrl: ['']
  });

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {}, () => {});
  }

  public getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    },
    (httpError: HttpErrorResponse) => {
      alert(httpError.message);
    });
  }

  public onAddEmployee(addForm: any): void {
    this.employeeService.addNewEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.employees.push(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(updateForm: any): void {
    const employee: Employee = updateForm.value;
    this.employeeService.updateEmployeeInfo(this.focusedEmployee?.id, employee).subscribe(() => {
        const index = this.employees.findIndex(employee => employee.id === this.focusedEmployee?.id);
        employee.id = this.focusedEmployee?.id;
        this.employees[index] = employee;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(): void {
    this.employeeService.deleteEmployee(this.focusedEmployee?.id).subscribe(() => {
      // remove deleted employee from list
      this.employees = this.employees.filter(employee => employee.id !== this.focusedEmployee?.id);
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

  public onOpenModal(employee: Employee, mode: string, template: any): void {
    this.focusedEmployee = employee;
    if (mode === 'delete' || mode === 'edit') {
      this.open(template);
    }
  }

}
