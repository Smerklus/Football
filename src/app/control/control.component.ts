import { Component, OnInit } from '@angular/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';
export interface TeamType {
  value: string;
  viewValue: string;
}
export interface Player {
  name: string;
  surname: string;
  teamType: TeamType;
}
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  teamTypes: TeamType[] = [
    { value: 'mini-team', viewValue: 'Мини-футбол' },
    { value: 'mass-team', viewValue: 'Массовый футбол' },
    { value: 'mini-team-double', viewValue: 'Мини-футбол дубль' }
  ];

  inputName;
  inputSname;
  newVal;
  players: Player[] = [];

  constructor() { }
  public onChange(event): void {
    this.newVal = event.value;
    console.log(this.newVal);
  }

  addPlayer() {
    this.players.push(
      {
        name: this.inputName,
        surname: this.inputSname,
        teamType: this.newVal
      })
    console.log(this.players)
  };


}
