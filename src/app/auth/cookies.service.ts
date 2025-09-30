import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class CookiesService {
	constructor(@Inject(DOCUMENT) private document: Document) {}

	setCookie(key: string, value: string, expires?: string): void {
		this.document.cookie = key + "=" + value + ";expires=" + expires + "SameSite=None; Secure";
	}

	getCookie(): string {
		const token = this.document.cookie;
		return token.split('=')[1];
	}

	deleteCookie(key: string): void {
		this.document.cookie = key + "=" + '' + ";expires=" + 0 + "SameSite=None; Secure";
	}
}
