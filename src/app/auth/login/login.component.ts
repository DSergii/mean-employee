import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { loginAnimation } from "../animation";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { SignupComponent } from "../signup/signup.component";

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

    private fb = inject(FormBuilder);

    loginForm: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    signIn(): void {

    }

}
