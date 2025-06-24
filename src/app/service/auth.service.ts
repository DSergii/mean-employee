import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthModel, AuthResponseModel } from "../auth/auth.model";

@Injectable()
export class AuthService {
	private API = 'http://localhost:3000';
	private path = '/api/auth';

	private http = inject(HttpClient);

	createUser(body: {email: string, password: string}): Observable<AuthResponseModel> {
		return this.http.post<AuthResponseModel>(`${this.API}${this.path}/signup`, body);
	}

	login(body: {email: string, password: string}): Observable<string> {
		return this.http.post<string>(`${this.API}${this.path}/login`, body);
	}
}
