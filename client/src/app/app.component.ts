import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from "@angular/forms";
import { AppService } from "./app.service";
import { AuthGaurd } from "./auth-gaurd.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  auth_subscription: any;
  constructor(private appService:AppService, private authGaurd:AuthGaurd ){

  }
  ngOnInit(){
    this.appService.verifyUser().subscribe((res) => {
      this.authGaurd.isLoggedIn = true
      this.appService.changeState(true)
    }, (err) => {
      this.appService.changeState(false)
    })
  }
}
