import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatTable } from '@angular/material';
export interface MatchType {
  value: string;
  viewValue: string;
}
export interface TeamType {
  value: string;
  viewValue: string;
}

export interface CalendarGame {
  data: string;
  time: string;
  oponent: string;
  count: string;
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  matchTypes: MatchType[] = [
    { value: 'white-night', viewValue: 'Белые ночи' },
    { value: 'ole-cup', viewValue: 'Кубок Оле' },
    { value: 'winter-cup', viewValue: 'Зимний кубок' }
  ];
  teamTypes: TeamType[] = [
    { value: 'all-teams', viewValue: 'Все команды' },
    { value: 'sk-volna', viewValue: 'СК Волна' },
    { value: 'zolotoy', viewValue: 'Золотой' },
    { value: 'balt-avto', viewValue: 'БАЛТ АВТО' }
  ];

  calendarGames: CalendarGame[] = [
    { data: '16 июня 2019', time: '12:30', oponent: 'БАЛТ АВТО', count: '2:1' },
    { data: '20 июля 2019', time: '14:15', oponent: 'Золотой', count: '1:1' },
    { data: '4 августа 2019', time: '18:00', oponent: 'СК Волна', count: '2:0' },
  ];

  displayedColumns: string[] = ['data', 'time', 'oponent', 'count'];
  dataSource = new MatTableDataSource(this.calendarGames);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  
  sortCalendarGames:CalendarGame[];
  selectedTeamType: any;

  constructor() { }

  public changeTeamType(event): void {
    this.selectedTeamType = event.value.viewValue;
    this.sortCalendarGames = this.calendarGames.filter(x => x.oponent == this.selectedTeamType);
    if (this.selectedTeamType=='Все команды'){
      this.dataSource = new MatTableDataSource(this.calendarGames);}
    else
    {this.dataSource = new MatTableDataSource(this.sortCalendarGames);}
    this.table.renderRows();
     }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
