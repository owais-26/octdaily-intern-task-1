import { Component, OnInit } from '@angular/core';

import { Employee } from 'src/app/models/employee.model';




@Component({

  selector: 'app-employees-list',

  templateUrl: './employees-list.component.html',

  styleUrls: ['./employees-list.component.css'],

})

export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [

    {

      id: 'emp-001',

      name: 'owais',

      email: 'owais.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Tech',

    },
    {

      id: 'emp-001',

      name: 'owais',

      email: 'owais.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Tech',

    },
    {

      id: 'emp-001',

      name: 'owais',

      email: 'owais.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Tech',

    },
    {

      id: 'emp-001',

      name: 'owais',

      email: 'owais.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Tech',

    },
    {

      id: 'emp-001',

      name: 'owais',

      email: 'owais.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Tech',

    },

    {

      id: 'emp-002',

      name: 'shees',

      email: 'shees.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Tech',

    },

    {

      id: 'emp-003',

      name: 'sumeed',

      email: 'sumeed.octdaily@outlook.com',

      phone: 999999999,

      salary: 40000,

      department: 'Lead',

    },

  ];
  originalEmployees: Employee[] = [];
  displayedEmployees: Employee[] = [];
  currentPage = 1;
  employeesPerPage = 5;
  searchTerm = '';


  constructor() {}

  ngOnInit(): void {

    this.updateDisplayedEmployees();
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

  updateDisplayedEmployees(): void {
    const startIndex = (this.currentPage - 1) * this.employeesPerPage;
    const endIndex = startIndex + this.employeesPerPage;
    let filteredEmployees = this.employees;

    if (this.searchTerm) {
      filteredEmployees = this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchTerm)
      );
    }

    this.displayedEmployees = filteredEmployees.slice(startIndex, endIndex);
  }
}


