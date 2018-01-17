import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from "@angular/forms";
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  switchForm:FormGroup
  constructor(private fb:FormBuilder, private appService:AppService){
    this.switchForm = fb.group({
      'switch_value':[null]
    })
  }

  ngAfterViewInit(){
    this.switchForm.controls['switch_value'].valueChanges.subscribe((value)=>{
        this.appService.changeValue(this.switchForm.value).subscribe((success)=>{
          console.log(success)
        })
    })
  }

}
