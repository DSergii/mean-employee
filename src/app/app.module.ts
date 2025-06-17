import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreComponent } from "./core/core.component";
import { AppRoutingModule } from "./routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./auth/login/login.component";
import { RouterModule } from "@angular/router";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./core/guard/auth.guard";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserModule,
        CoreComponent,
        LoginComponent,
        BrowserAnimationsModule
    ],
    providers: [
        AuthService,
        // AuthGuard,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
