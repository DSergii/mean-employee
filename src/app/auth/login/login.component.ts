import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { loginAnimation } from "../animation";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { SignupComponent } from "../signup/signup.component";
import { AuthService } from "../../service/auth.service";
import { SnackbarService } from "../snackbar.service";
import { CookiesService } from "../cookies.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        SignupComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    animations: [loginAnimation],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    @HostBinding('class.login-holder') hostClass = true;

    isLogin = true;

    private readonly authService = inject(AuthService);
    private readonly fb = inject(FormBuilder);
    private readonly snackbar = inject(SnackbarService);
    private readonly cookiesService = inject(CookiesService);
    private readonly router = inject(Router);

    loginForm: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    signIn(): void {
        this.authService.login(this.loginForm.value)
            .subscribe(result => {
                console.log(result);
                const cookieExpire = new Date(new Date().setHours(new Date().getHours() + 12)).toUTCString();
                this.cookiesService.setCookie('token', result, cookieExpire);
                this.router.navigate(['employee']);
            }, error => {
                this.snackbar.showSnackbar(error.error.error)
            });
    }

}
