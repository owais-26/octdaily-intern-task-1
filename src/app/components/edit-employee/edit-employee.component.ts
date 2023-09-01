import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              // Assuming response matches the Employee model structure
              this.employeeDetails = response;
            },
          });
        }
      },
    });
  }
  updateEmployee(): void {
    // You can implement your update logic here
    // For example, you can call a service method to update the employee details
    this.employeeService
      .updateEmployee(this.employeeDetails.id, this.employeeDetails)
      .subscribe({
        next: (response) => {
          console.log('Employee updated successfully:', response);
          this.router.navigate(['employees']);
          // You can optionally navigate to a different page or display a success message here
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          // Handle the error, e.g., display an error message to the user
        },
      });
  }
  deleteEmployee(): void {
    const employeeId = this.employeeDetails.id;

    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        this.router.navigate(['employees']);
        // You can optionally navigate to a different page or display a success message here
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        // Handle the error, e.g., display an error message to the user
      },
    });
  }
}
