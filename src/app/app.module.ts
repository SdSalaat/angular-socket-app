import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {SharedModule} from './services/shared.module';
import {FormsModule} from '@angular/forms';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxUiLoaderModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
