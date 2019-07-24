import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TrainerService } from '../services/trainers.service';
import { Trainer } from '../models/trainer.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  players: Player[] = [];
  displayedColumns: string[] = ['count', 'name', 'surname', 'role', 'number'];
  dataCountMainPlayers = [];
  dataCountDPlayers = [];
  trainers: Trainer[];


  dataMainPlayersSource: MatTableDataSource<Player>;
  dataDPlayersSource: MatTableDataSource<Player>;
  @ViewChild('MatSortMain', { static: true }) sortMain: MatSort;
  @ViewChild('MatSortD', { static: true }) sortD: MatSort;
  constructor(public playerApi: PlayerService, public trainerApi: TrainerService) {
    playerApi.getPlayers().subscribe(x => {
      this.players = x;
      this.dataCountMainPlayers = this.players.filter(player => player.teamType.value == "main"
      );
      let i = 1;
      this.dataCountMainPlayers.forEach(x => { x.count = i++ })
      this.dataCountDPlayers = this.players.filter(player =>
        player.teamType.value == "d"
      );
      let j = 1;
      this.dataCountDPlayers.forEach(x => { x.count = j++ });
      this.setDataMainPlayersSource(this.dataCountMainPlayers);
      this.setDataDPlayersSource(this.dataCountDPlayers)
      console.log(this.dataMainPlayersSource)
      console.log(this.dataDPlayersSource)
    });
    trainerApi.getTrainers().subscribe(z=>{
      this.trainers = z;
    })
  }
  ngOnInit() {
  }
  setDataMainPlayersSource(array) {
    this.dataMainPlayersSource = new MatTableDataSource(array);
    this.dataMainPlayersSource.sort = this.sortMain;
    this.dataMainPlayersSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case "role": return item.role.viewValue;
         default: return item[property];
      }
    };
  }
  setDataDPlayersSource(array) {
    this.dataDPlayersSource = new MatTableDataSource(array);
    this.dataDPlayersSource.sort = this.sortD;
    this.dataDPlayersSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case "role": return item.role.viewValue;
         default: return item[property];
      }
    };
  }
}
