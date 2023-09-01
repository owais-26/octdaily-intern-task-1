import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';




@Component({
  selector: 'app-add-employee',

  templateUrl: './add-employee.component.html',

  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
    createdOn: new Date(), // Set default value to current date and time
    lastModifiedOn: new Date(), // Set default value to current date and time
    createdBy: '', // Set default value to an empty string or the current user's name
    lastModifiedBy: '', // Set default value to an empty string or the current user's name
  };

  constructor(
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        this.router.navigate(['employees']);
      },
    });
  }
}