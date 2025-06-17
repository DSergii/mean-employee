import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./guard/auth.guard";
import { AppRoutingModule } from "../routing.module";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { EmployeeListComponent } from "../employee-list/employee-list.component";

@Component({
    selector: 'app-core',
    standalone: true,
    imports: [
        CommonModule,
        // BrowserModule,
        RouterOutlet,
        HeaderComponent,
        AddEmployeeComponent,
        EmployeeListComponent
    ],
    templateUrl: './core.component.html',
    styleUrl: './core.component.css',
    encapsulation: ViewEncapsulation.None
})
export class CoreComponent {

}
