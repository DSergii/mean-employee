import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MongoUser, User } from './user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private API = 'http://localhost:3000';
    private path = '/api/user';

    private http =  inject(HttpClient);

    getUsers(): Observable<MongoUser[]> {
        return this.http.get<MongoUser[]>(`${this.API}${this.path}`);
    }

    getUserById(id: string): Observable<MongoUser> {
        return this.http.get<MongoUser>(`${this.API}${this.path}/${id}`);
    }

    addUser(user: Partial<User>, image: File): Observable<User> {
        const userData = new FormData();
        userData.append('name', user.name);
        userData.append('email', user.email);
        userData.append('image', image, user.name);
        return this.http.post<User>(`${this.API}${this.path}`, userData);
    }

    updateUser(user: Partial<User | FormData>): Observable<User> {
        return this.http.put<User>(`${this.API}${this.path}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete<any>(`${this.API}${this.path}/${id}`)
    }
}
