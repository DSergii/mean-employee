import { Component, inject, OnInit } from '@angular/core';
import { User } from '../service/user.interface';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
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
    this.router.navigate(['edit', id])
  }

}

