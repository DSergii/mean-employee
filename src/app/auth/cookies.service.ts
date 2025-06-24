import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class CookiesService {
	constructor(@Inject(DOCUMENT) private document: Document) {}

	setCookie(key: string, value: string, expires?: number): void {
		this.document.cookie = key + "=" + value + ";expires=" + expires + "SameSite=None; Secure";
	}

	getCookie(): string {
		return this.document.cookie;
	}
}
