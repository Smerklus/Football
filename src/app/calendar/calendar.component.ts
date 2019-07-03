import { Component, OnInit } from '@angular/core';
export interface MatchType {
  value: string;
  viewValue: string;
}
export interface TeamType {
  value: string;
  viewValue: string;
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
    { value: '1x-bet', viewValue: '1X BET' },
    { value: 'fc-city', viewValue: 'FC CITY' },
    { value: 'avangard', viewValue: 'Авангард' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
