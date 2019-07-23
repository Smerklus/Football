import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
import { TeamType } from '../models/team-type.model';
import { DeleteDialogPlayerComponent } from '../delete-dialog-player/delete-dialog-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  roles: Role[] = [
    { value: 'goalkeeper', viewValue: 'Вратарь' },
    { value: 'all-purpose', viewValue: 'Универсал' },
  ];
  teamTypes: TeamType[] = [
    { value: 'main', viewValue: 'РИВ ГОШ' },
    { value: 'd', viewValue: 'РИВ ГОШ - д' },
  ];
  id;
  inputName;
  inputSname;
  inputNumber;
  selectedRole;
  selectedTeamType;
  role;
  teamType;
  player;
  players: Player[] = [];
  playerForm: FormGroup;

  displayedColumns: string[] = ['edit', 'name', 'surname', 'role', 'team', 'number', 'delete'];

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  constructor(public playerApi: PlayerService, public dialog: MatDialog, public activatedRoute: ActivatedRoute, public route: Router) {



    playerApi.getPlayers().subscribe(x => this.players = x)
    activatedRoute.paramMap.subscribe(x => {

      this.id = x.get('id');
      if (this.id) {
        this.playerApi.getPlayerById(this.id).subscribe(x => {
          this.player = x;

          if (this.player) {
            this.playerForm.patchValue({
              name: this.player.name,
              surname: this.player.surname,
              role: this.roles.find(z => z.value == this.player.role.value),
              teamType: this.teamTypes.find(z => z.value == this.player.teamType.value),
              number: this.player.number
            });
            // this.teamType=this.playerForm.value.teamType.value;
            console.log(this.playerForm)
          };
        });
      };
    })
  }

  compareFn(type1: any, type2: any): boolean {
    return type1 && type2 ? type1.value === type2.value : type1 === type2;
  }

  public changeRole(event): void {
    this.selectedRole = event.value;
    console.log(this.selectedRole);
  }
  public changeTeamType(event): void {
    this.selectedTeamType = event.value;
    console.log(this.selectedTeamType);
  }

 
 

  deletePlayer(player) {
    this.playerApi.deletePlayer(player.path[1].childNodes[1].innerHTML).subscribe(x => {
      this.players.splice(player.path[4].rowIndex - 1, 1);
      this.table.renderRows();
      console.log(player);
    })
  };
  editPlayer(player) {
    this.route.navigate(['/control_panel/', player.path[1].childNodes[1].innerHTML])
  }

  openDialog(player) {
    const dialogRef = this.dialog.open(DeleteDialogPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deletePlayer(player);
    });
  }

  onSubmitPlayerForm(formData: any, formDirective: FormGroupDirective) {
    if (this.id) {

      this.playerApi.putPlayerById(
        this.id,
        {
          name: this.playerForm.value.name,
          surname: this.playerForm.value.surname,
          role: this.playerForm.value.role,
          teamType: this.playerForm.value.teamType,
          number: this.playerForm.value.number,
        }).subscribe(x => {
          this.playerApi.getPlayers().subscribe(x => this.players = x);
          this.table.renderRows();
          console.log(this.playerForm)
          formDirective.resetForm();
          this.playerForm.reset();
          console.log(this.players)
        })
    }
    else {
      this.playerApi.postPlayer(
        {
          name: this.playerForm.value.name,
          surname: this.playerForm.value.surname,
          role: this.playerForm.value.role,
          teamType: this.playerForm.value.teamType,
          number: this.playerForm.value.number,
        }).subscribe(x => {
          this.players.push(x)
          this.table.renderRows();
          console.log(this.playerForm)
          formDirective.resetForm();
          this.playerForm.reset();
          console.log(this.players)
        })
    }

  }

  ngOnInit() {
    this.playerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      teamType: new FormControl('', Validators.required),
      number: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]))

    });
  }
}
