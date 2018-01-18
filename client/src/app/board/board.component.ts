import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder,  FormGroup, Validators } from "@angular/forms";
import { AppService } from "../app.service";


@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})

export class BoardComponent implements OnInit, AfterViewInit {
  
  boardForm:FormGroup;
  constructor(private fb:FormBuilder, private appService:AppService){
    this.boardForm = fb.group({
      'fan_switch':[false],
      'fan_slider':[0],
      'ac_switch':[false],
      'ac_slider':[0],
      'light_switch':[false],
      'light_slider':[0],
    })
  }

  ngOnInit(){
    
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
