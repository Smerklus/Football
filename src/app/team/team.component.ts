import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  players: Player[] = [];

  constructor(public playerApi: PlayerService) {
    playerApi.getPlayers().subscribe(x => this.players = x)
  }
  ngOnInit() {
  }

}
