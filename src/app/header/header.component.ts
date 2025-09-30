import { Component, inject } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { CookiesService } from "../auth/cookies.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [MatToolbarModule, RouterLink, MatButtonModule],
    standalone: true
})
export class HeaderComponent {

    private readonly cookiesService = inject(CookiesService);
    private readonly router = inject(Router);

    logout(): void {
        this.cookiesService.deleteCookie('token');
        this.router.navigate(['/']);
    }

}
