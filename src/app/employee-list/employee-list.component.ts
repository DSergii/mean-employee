import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../service/user.interface';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css'],
	standalone: true,
	imports: [
		CommonModule,
		MatToolbarModule,
		MatTableModule,
		MatButtonModule,
		MatInputModule
	],
	encapsulation: ViewEncapsulation.None
})
export class EmployeeListComponent implements OnInit {
	private readonly userDataService = inject(UserDataService);
	private readonly router = inject(Router);

	public tableColumns: string[] = ['name', 'email', 'action'];

	public userList: User[] = [];

    constructor() {
		this.userDataService.getUsers();
    }

    ngOnInit(): void {
		this.userDataService.userList$.subscribe((users: User[]) => this.userList = users);
    }

	public deleteUser(id: string): void {
		this.userDataService.deleteUser(id);
	}

	public editUser(id: string): void {
		this.router.navigate(['employee/edit', id]).then();
	}

}

