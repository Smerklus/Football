import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { MatTableDataSource, MatSort, MatTable } from '@angular/material';
import { CalendarMatch } from '../models/calendar-match.model';
import { CalendarService } from '../services/calendar.service';
import { TeamType } from '../models/team-type';
export interface MatchType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
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

  calendarMatches: CalendarMatch[] = [
    {
      data: "2019-07-01T21:00:00.000Z",
      time: "12:30",
      oponent: "Перу",
      score: "1:3",
      "id": 14
    },
    {
      data: "2019-07-06T21:00:00.000Z",
      time: "12:40",
      oponent: "Авто",
      score: "1:2",
      "id": 15
    }
  ];

  displayedColumns: string[] = ['data', 'time', 'oponent', 'score'];
  dataSource: MatTableDataSource<CalendarMatch>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedTeamType: any;

  teams = [];
  teamsSet;

  constructor(public calendarService: CalendarService) {
    calendarService.getCalendarMatches().subscribe(x => {
      this.setDataSource(this.calendarMatches = x);
      this.calendarMatches.forEach(x => {
        this.teams.push(x.oponent);
      });
      this.sortTeams();
    });

  }

  ngOnInit() {
  }

  sortTeams() {
    this.teams.sort((a, b) => {
      let oponentA = a.toLowerCase();
      let oponentB = b.toLowerCase();
      if (oponentA < oponentB)
        return -1;
      if (oponentA > oponentB)
        return 1;
      return 0;
    });
    this.teamsSet = new Set(this.teams);
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
  }

  setDataSource(array: CalendarMatch[]) {
    this.dataSource = new MatTableDataSource(array);
    this.dataSource.sort = this.sort;
  }
}
