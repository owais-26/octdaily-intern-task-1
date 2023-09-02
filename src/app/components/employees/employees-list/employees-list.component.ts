import { Component, OnInit } from '@angular/core';

import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',

  templateUrl: './employees-list.component.html',

  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  originalEmployees: Employee[] = [];
  displayedEmployees: Employee[] = [];
  currentPage = 1;
  employeesPerPage = 5;
  searchTerm = '';
  createdByFilter: string = '';
  lastModifiedByFilter: string = '';
  createdOnFilter: Date | null = null;
  lastModifiedOnFilter: Date | null = null;
  constructor(private employeesServices: EmployeesService) {}

  ngOnInit(): void {
    this.employeesServices.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.originalEmployees = employees; // Store a copy for filtering
        this.updateDisplayedEmployees();
        console.log(this.displayedEmployees);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  toggleSort(order: 'asc' | 'desc'): void {
    if (order === 'asc') {
      this.employees.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.employees.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.updateDisplayedEmployees(); // After sorting, update displayed employees
  }
  onSearch($event: any): void {
    this.searchTerm = $event?.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    this.currentPage = 1; // Reset to first page when performing a new search
    this.updateDisplayedEmployees();
  }

  get totalPages(): number {
    return Math.ceil(this.employees.length / this.employeesPerPage);
  }

  get pages(): number[] {
    const pagesArray: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  changePage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updateDisplayedEmployees();
    }
  }
  applyFilters(): void {
    this.displayedEmployees = this.originalEmployees.filter((employee) => {
      const createdOnMatch =
        !this.createdOnFilter ||
        this.compareDates(this.createdOnFilter, employee.createdOn);

      const lastModifiedOnMatch =
        !this.lastModifiedOnFilter ||
        this.compareDates(this.lastModifiedOnFilter, employee.lastModifiedOn);

      const createdByMatch =
        !this.createdByFilter ||
        employee.createdBy
          .toLowerCase()
          .includes(this.createdByFilter.toLowerCase());

      const lastModifiedByMatch =
        !this.lastModifiedByFilter ||
        employee.lastModifiedBy
          .toLowerCase()
          .includes(this.lastModifiedByFilter.toLowerCase());

      return (
        createdOnMatch &&
        lastModifiedOnMatch &&
        createdByMatch &&
        lastModifiedByMatch
      );
    });
  }

  compareDates(filterDate: Date | null, employeeDate: Date): boolean {
    if (!filterDate) {
      return true; // If no filter date is provided, consider it a match
    }

    // Compare the filterDate and employeeDate
    return (
      filterDate.getUTCFullYear() === employeeDate.getUTCFullYear() &&
      filterDate.getUTCMonth() === employeeDate.getUTCMonth() &&
      filterDate.getUTCDate() === employeeDate.getUTCDate()
    );
  }

  updateDisplayedEmployees(): void {
    const startIndex = (this.currentPage - 1) * this.employeesPerPage;
    const endIndex = startIndex + this.employeesPerPage;
    let filteredEmployees = this.employees;

    if (this.searchTerm) {
      filteredEmployees = this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchTerm)
      );
    }

    this.displayedEmployees = filteredEmployees.slice(startIndex, endIndex);
  }
}
