import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthModel } from "../auth/auth.model";

@Injectable()
export class AuthService {
	private API = 'http://localhost:3000';
	private path = '/api/auth';

	private http = inject(HttpClient);

	createUser(body: {email: string, password: string}): Observable<AuthModel> {
		return this.http.post<AuthModel>(`${this.API}${this.path}/signup`, body);
	}
}
