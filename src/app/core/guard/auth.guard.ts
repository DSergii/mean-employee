import {
	ActivatedRouteSnapshot,
	CanActivate,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { CookiesService } from "../../auth/cookies.service";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	// private readonly route =  inject(ActivatedRouteSnapshot);
	// private readonly state = inject(RouterStateSnapshot);
	private readonly cookiesService = inject(CookiesService);

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
		const token = this.cookiesService.getCookie();
		return !!token;
	}
}
