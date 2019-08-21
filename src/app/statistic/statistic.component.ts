import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { PlayerService } from '../services/player.service';
import { CalendarService } from '../services/calendar.service';
import { Player } from '../models/player.model';

export interface StatisticElement {
  player: Player;
  countMatchs: number;
  yellowCard: number;
  redCard: number;
  goal: number;
  pass: number;
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  statisticElements: StatisticElement[] = [];

  displayedColumns: string[] = ['player', 'countMatchs', 'yellowCard', 'redCard', 'goal', 'pass'];
  dataSource: MatTableDataSource<StatisticElement>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public playerAPI: PlayerService, public calendarAPI: CalendarService) {
    this.playerAPI.getPlayers().subscribe(players => {
      players.forEach(player => {
        this.statisticElements.push({ player: player, countMatchs: 0, yellowCard: 0, redCard: 0, goal: 0, pass: 0 })
      })
      this.calendarAPI.getCalendarMatches().subscribe(matches => {
        matches.forEach(match => {
          this.statisticElements.forEach(element => {
            if (match.isPast && match.composition.find(x => element.player.id == x.id)) { element.countMatchs = element.countMatchs + 1 };
            if (match.yellowCards.find(x => element.player.name == x.player.name && element.player.surname == x.player.surname && x.player.team == "own")) { element.yellowCard = element.yellowCard + 1 };
            if (match.redCards.find(x => element.player.name == x.player.name && element.player.surname == x.player.surname && x.player.team == "own")) { element.redCard = element.redCard + 1 };
            if (match.goalsList.ownGoals.find(x => element.player.name == x.player.name && element.player.surname == x.player.surname)) { element.goal = element.goal + 1 };
          })
        })
      })
      this.setDataSource(this.statisticElements);
    })

  }

  ngOnInit() {
  }

  setDataSource(array: StatisticElement[]) {
    this.dataSource = new MatTableDataSource(array);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
  }

}
