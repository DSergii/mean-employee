import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthGuard implements CanActivate {
	constructor(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
		return false;
	}
}
