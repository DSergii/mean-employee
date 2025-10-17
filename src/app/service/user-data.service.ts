import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { User } from './user.interface';
import { UserService } from './user.service';
import { SnackbarService } from "../auth/snackbar.service";

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	private readonly userService = inject(UserService);
	private readonly snackbar = inject(SnackbarService);

	private userList: User[] = [];
	private _userList$ = new Subject();
	public userList$ = this._userList$.asObservable();

	constructor() { }

	private setUsers(users: User[] | User): void {
		if(Array.isArray(users)) {
		    this.userList = users;
		} else {
		    this.userList.push(users);
		}
		this._userList$.next(this.userList);
	}

	getUsers(): void {
		this.userService.getUsers()
			.pipe(
				map((data) => data.map(
			        user => ({id: user._id, name: user.name, email: user.email, imagePath: user.imagePath})
				))
			).subscribe({
				next: (data: User[]) => {
					this.setUsers(data)
				},
				error: error => this.snackbar.showSnackbar(error.error.message)
			})
	}

	addUser(user: Partial<User>, image: File): void {
		this.userService.addUser(user, image).subscribe((data: User) => this.setUsers(data))
	}

	deleteUser(id: string): void {
		this.userService.deleteUser(id)
	    .subscribe(() => {
			const updatedUsers = this.userList.filter(user => user.id !== id)
			this.setUsers(updatedUsers);
	    });
	}

	getUserById(id: string): Observable<User> {
		return this.userService.getUserById(id)
            .pipe(
				map((user) => (
				    {
						id: user._id,
						name: user.name,
						email: user.email,
						imagePath: user.imagePath
				    })
				)
	        )
	}

	updateUser(user: Partial<User>, image: File): void {
		let userData: User | FormData;

		if (typeof image === 'object') {
			userData = new FormData();
			userData.append('id', user.id);
			userData.append('name', user.name);
			userData.append('email', user.email);
			userData.append('image', image, user.name);
		} else {
			const { id, name, email } = user;
			userData = {
				id,
				name,
				email,
				imagePath: image
			};
		}
		this.userService.updateUser(userData).subscribe({
			next: () => {},
			error: () => {this.snackbar.showSnackbar('Sorry, sth went wrong!')}
		})
	}
}
