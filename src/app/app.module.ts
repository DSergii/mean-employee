import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterModule } from '@angular/router';

const routes = [
    { path: '', component: EmployeeListComponent },
    { path: 'add', component: AddEmployeeComponent },
    { path: 'edit/:id', component: AddEmployeeComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AddEmployeeComponent,
        EmployeeListComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
