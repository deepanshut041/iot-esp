import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from "@angular/forms";
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  boardForm:FormGroup
  constructor(private fb:FormBuilder, private appService:AppService){
    this.boardForm = fb.group({
      'fan_switch':[false],
      'fan_slider':[1],
      'ac_switch':[false],
      'ac_slider':[1],
      'light_switch':[false],
      'light_slider':[1],
    })
  }

  ngAfterViewInit(){
    this.boardForm.valueChanges.subscribe((value)=>{
        this.appService.changeValue(this.boardForm.value).subscribe((success)=>{
          console.log(success)
        })
        console.log(value)
    })
  }

}
