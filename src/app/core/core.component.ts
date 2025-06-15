import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./guard/auth.guard";

@Component({
    selector: 'app-core',
    standalone: true,
    imports: [
        RouterModule,
        HeaderComponent,
        BrowserAnimationsModule,
    ],
    templateUrl: './core.component.html',
    styleUrl: './core.component.css',
    encapsulation: ViewEncapsulation.None
})
export class CoreComponent {

}
