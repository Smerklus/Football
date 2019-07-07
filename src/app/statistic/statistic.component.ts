import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface StatisticElement {
  player: string;
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
export class StatisticComponent implements OnInit  {
  
  statisticElements: StatisticElement[] = [
    { player: '16 июня 2019', countMatchs: 20, yellowCard: 2, redCard: 2, goal: 15, pass: 8 },
    { player: '20 июля 2019', countMatchs: 14, yellowCard: 1, redCard: 1, goal: 6, pass: 9 },
    { player: '4 августа 2019', countMatchs: 18, yellowCard: 3, redCard: 0, goal: 8, pass: 12 },
  ];

  displayedColumns: string[] = ['player', 'countMatchs', 'yellowCard', 'redCard','goal','pass'];
  dataSource = new MatTableDataSource(this.statisticElements);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { 
  }

  ngOnInit(){
  this.dataSource.sort = this.sort;
  }

}
