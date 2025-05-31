import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {

    private authService = inject(AuthService);

    @Output() backToLogin = new EventEmitter<boolean>();

    private fb = inject(FormBuilder);

    signupForm: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    signIn(): void {
        console.log('Value ::: ', this.signupForm.value);
        this.authService.createUser(this.signupForm.value).subscribe(response => {
            console.log("Response: ", response)
        });
    }
}
