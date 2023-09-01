import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';




import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';

import { AddEmployeeComponent } from './components/add-employee/add-employee/add-employee.component';

import { FormsModule } from '@angular/forms';

import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';




@NgModule({

  declarations: [

    AppComponent,

    EmployeesListComponent,

    AddEmployeeComponent,

    EditEmployeeComponent

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    FormsModule,

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }