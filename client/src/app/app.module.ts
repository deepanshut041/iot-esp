import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { BoardComponent } from "./board/board.component";
import { LoginComponent } from "./login/login.component";
import { AppService } from "./app.service";
import { AuthGaurd } from "./auth-gaurd.service";

@NgModule({
  declarations: [
    AppComponent, BoardComponent, LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [AppService, AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
