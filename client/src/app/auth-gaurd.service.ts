import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, Observer, Subject } from "rxjs/Rx";
import { AppService } from "./app.service";
/**
 * @description
 * @class
 */
@Injectable()
export class AuthGaurd implements CanActivate {
  public isLoggedIn:boolean = false;
  public redirectUrl:string;

  constructor(private router:Router){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
      this.redirectUrl = state.url
      return this.checkLogin(this.redirectUrl)
  }

  checkLogin(url:string):boolean{
    if(this.isLoggedIn){
        return true;
    }else{
        this.router.navigate(['login'])
    }
  }

  changeLoginStatus(status:boolean){
      this.isLoggedIn = status
  }
}
