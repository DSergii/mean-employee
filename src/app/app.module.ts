import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreComponent } from "./core/core/core.component";
import { AppRoutingModule } from "./routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./auth/login/login.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        CoreComponent,
        LoginComponent,
        AppRoutingModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
