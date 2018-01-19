import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { LoginComponent } from "./login/login.component";
import { AuthGaurd } from "./auth-gaurd.service";

const routes:Routes = [
    {path:'login', component:LoginComponent},
    {path:'', component:BoardComponent, canActivate:[AuthGaurd]}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}