import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { AppService } from "../app.service";


@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})

export class BoardComponent implements OnInit, AfterViewInit {

  boardForm: FormGroup;
  items: FormArray;
  appliances: any;
  constructor(private fb: FormBuilder, private appService: AppService) {
    this.boardForm = fb.group({
      'items': this.fb.array([])
    })
    this.items = this.boardForm.get('items') as FormArray
  }

  ngOnInit() {
    this.appService.getBoard().subscribe((value) => {
      this.appliances = value
      console.log(this.appliances);
      this.appliances.map(appliance=>{
        this.addItem(appliance)
      })
    }, (err) => {
      console.log(err)
    })
  }
  ngAfterViewInit() {
    this.items.controls.forEach(
      control => {
        control.valueChanges.subscribe(
          () => {
            console.log(this.items.controls.indexOf(control)) // logs index of changed item in form array
          })
      }
    )
  }

  createItem(item): FormGroup {
    console.log(item)
    return this.fb.group({
      'switch_value': [item['switch_value']],
      'slider_value': [item['slider_value']],
      'id':[item['id']],
      'user':[item['user']],
      'name':[item['name']],
      'slider_max':[item['slider_max']],
      'slider_min':[item['slider_min']],
      'slider_step':[item['slider_step']],
    });
  }
  addItem(item): void {
    this.items.push(this.createItem(item));
  }
}
