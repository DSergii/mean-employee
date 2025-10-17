import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../service/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../service/user.interface';
import { mimeTypeValidator } from './mime-type.validator';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css'],
	standalone: true,
	imports: [
		CommonModule,
		MatToolbarModule,
		MatTableModule,
		MatButtonModule,
		MatInputModule,
		ReactiveFormsModule
	],
	encapsulation: ViewEncapsulation.None
})
export class AddEmployeeComponent implements OnInit {
	private readonly userDataService = inject(UserDataService);
    private readonly activeRouter = inject(ActivatedRoute);

    public userId = '';
    public imagePreview: string;

	public ngOnInit(): void {
		this.userId = this.activeRouter.snapshot.paramMap.get('id');
		if (this.userId) {
	        this.userDataService.getUserById(this.userId)
			.subscribe((user: User) => {
		        this.userForm.setValue({ name: user.name, email: user.email, image: user.imagePath });
		        this.imagePreview = this.userForm.value.image;
			});
		}
	}

    public userForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required]),
		image: new FormControl(null, {
	    validators: [Validators.required]
		})
    });

    public addUser(): void {
		const user = this.userForm.getRawValue();
		const image = this.userForm.get('image').value;
		if(this.userId) {
		    this.userDataService.updateUser({...user, id: this.userId}, image);
		    return;
		}
		this.userDataService.addUser(user, image);
		this.imagePreview = '';
		this.userForm.reset();
    }

    public onImageSelected(event: Event): void {
		const image = (event.target as HTMLInputElement).files[0];
		this.userForm.get('image').setValue(image);
		const reader = new FileReader();
		reader.onload = () => {
	        this.imagePreview = reader.result as string;
			this.userForm.get('image').updateValueAndValidity();
		}
		reader.readAsDataURL(image);
    }

}
