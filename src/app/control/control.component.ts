import { Component, OnInit } from '@angular/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';
export interface Team {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  teams: Team[] = [
    { value: 'mini-taem', viewValue: 'Мини-футбол' },
    { value: 'mass-team', viewValue: 'Массовый футбол' },
    { value: 'mini-team-double', viewValue: 'Мини-футбол дубль' }
  ];

  inputName;
  inputSname;
  newVal;
  teamComposition: [
    {
      name: string,
      surname: string,
      composition: string
    }
  ];

  constructor() { }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
  }

  addPlayer() {
    this.teamComposition.push(
      {
        name: this.inputName,
        surname: this.inputSname,
        composition: this.newVal
      })
    console.log(this.teamComposition)
  };


}
