import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
export interface Role {
  value: string;
  viewValue: string;
}
export interface TeamType {
  value: string;
  viewValue: string;
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

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  constructor(public playerApi: PlayerService) {
    playerApi.getPlayers().subscribe(x => this.players = x)
  }

  public changeRole(event): void {
    this.selectedRole = event.value;
    console.log(this.selectedRole);
  }
  public changeTeamType(event): void {
    this.selectedTeamType = event.value;
    console.log(this.selectedTeamType);
  }

  addPlayer() {
    this.playerApi.postPlayer(
      {
        name: this.inputName,
        surname: this.inputSname,
        role: this.selectedRole,
        teamType: this.selectedTeamType,
      }).subscribe(x => {
        this.players.push(x)
        this.table.renderRows();
        this.inputName = '';
        this.inputSname = '';
        console.log(this.players)
      })

  };

  deletePlayer(player) {
    this.playerApi.deletePlayer(player.path[1].childNodes[1].innerHTML).subscribe(x => {
      this.players.splice(player.path[4].rowIndex - 1, 1);
      this.table.renderRows();
      console.log(player);
  })
};


}
