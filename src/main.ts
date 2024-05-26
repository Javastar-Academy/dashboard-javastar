import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {bootstrapApplication} from "@angular/platform-browser";
import {importProvidersFrom} from "@angular/core";
import {AppComponent} from "./app/app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app/app-routing/app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ButtonModule} from "primeng/button";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(FontAwesomeModule),
    importProvidersFrom(ButtonModule),
  ],
}).catch(err => console.error(err));

