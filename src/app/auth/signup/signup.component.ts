import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../service/auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthResponseModel } from "../auth.model";
import { SnackbarService } from "../snackbar.service";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    /* Created users:
        admin@admin / admin
        admin2@admin / admin2
     */

    @Output() backToLogin = new EventEmitter<boolean>();

    private readonly authService = inject(AuthService);
    private readonly fb = inject(FormBuilder);
    private readonly snackbar = inject(SnackbarService);

    signupForm: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    signIn(): void {
        this.authService.createUser(this.signupForm.value)
            .subscribe(
                (response: AuthResponseModel) => {
                    this.snackbar.showSnackbar(response.message)
            }, (error) => {
                this.snackbar.showSnackbar(error.error.error.message)
            });
    }
}
