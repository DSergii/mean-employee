import { LoginComponent } from "./auth/login/login.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CoreComponent } from "./core/core/core.component";
import { AuthGuard } from "./core/core/guard/auth.guard";

const routes: Routes = [
	{ path: 'employee', component: CoreComponent, canActivate: [AuthGuard],
		children: [
			{ path: 'add', component: AddEmployeeComponent },
			{ path: 'edit/:id', component: AddEmployeeComponent },
		]
	},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: '**', component: LoginComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
