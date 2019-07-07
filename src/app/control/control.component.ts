import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
export interface Role {
  value: string;
  viewValue: string;
}
export interface TeamType {
  value: string;
  viewValue: string;
}
export interface Player {
  name: string;
  surname: string;
  role: Role;
  teamType: TeamType;
}

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  roles: Role[] = [
    { value: 'goalkeeper', viewValue: 'Вратарь' },
    { value: 'all-purpose', viewValue: 'Универсал' },
  ];
  teamTypes: TeamType[] = [
    { value: 'main', viewValue: 'РИВ ГОШ' },
    { value: 'd', viewValue: 'РИВ ГОШ - д' },
  ];

  inputName;
  inputSname;
  selectedRole;
  selectedTeamType;
  players: Player[] = [];

  displayedColumns: string[] = ['name', 'surname', 'role', 'team', 'delete'];
  dataSource = this.players;

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  constructor() { }

  public changeRole(event): void {
    this.selectedRole = event.value;
    console.log(this.selectedRole);
  }
  public changeTeamType(event): void {
    this.selectedTeamType = event.value;
    console.log(this.selectedTeamType);
  }

  addPlayer() {
    this.players.push(
      {
        name: this.inputName,
        surname: this.inputSname,
        role: this.selectedRole,
        teamType: this.selectedTeamType,
      })
    this.table.renderRows();
    this.inputName = '';
    this.inputSname = '';
    console.log(this.players)
  };

  deletePlayer(player) {
    this.players.splice(player.path[4].rowIndex - 1, 1)
    this.table.renderRows();
    console.log(player)
  };


}
