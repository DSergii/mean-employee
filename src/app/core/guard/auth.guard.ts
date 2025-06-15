import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { inject, Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	private readonly route =  inject(ActivatedRouteSnapshot);
	private readonly state = inject(RouterStateSnapshot);

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
		return true;
	}
}
