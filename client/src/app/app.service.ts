import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService{
   constructor(private http:HttpClient){

   } 
   changeValue(value){
       const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
       return this.http.post("./api/board", value, {headers:headers})
   }
}