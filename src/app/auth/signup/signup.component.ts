import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../service/auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthResponseModel } from "../auth.model";

const enum SnackBarConfig {
    VERTICAL = 'top',
    HORIZONTAL = 'center',
    DURATION = 5 * 1000 // 3 sec
}

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

    private authService = inject(AuthService);
    private snackBar = inject(MatSnackBar);
    private fb = inject(FormBuilder);

    signupForm: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    signIn(): void {
        console.log('Value ::: ', this.signupForm.value);
        this.authService.createUser(this.signupForm.value)
            .subscribe(
                (response: AuthResponseModel) => {
                    this.showSnackbar(response.message)
            }, (error) => {
                this.showSnackbar(error.error.error.message)
            });
    }

    showSnackbar(message: string): void {
        this.snackBar.open(message, 'X', {
            duration: SnackBarConfig.DURATION as number,
            horizontalPosition: SnackBarConfig.HORIZONTAL,
            verticalPosition: SnackBarConfig.VERTICAL
        });
    }
}
