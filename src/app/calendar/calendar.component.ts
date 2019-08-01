import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { MatTableDataSource, MatSort, MatTable, MatDialog } from '@angular/material';
import { CalendarMatch } from '../models/calendar-match.model';
import { CalendarService } from '../services/calendar.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { TeamType } from '../models/team-type.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
export interface MatchType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      // transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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

  calendarMatches: CalendarMatch[] = [];
  
  displayedColumns: string[] = ['edit','date', 'time', 'oponent', 'score', 'delete'];
  dataSource: MatTableDataSource<CalendarMatch>;
  expandedElement: CalendarMatch | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedTeamType: any;

  teams = [];
  teamsSet;
  checked;

  constructor(public calendarService: CalendarService, public dialog: MatDialog) {
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

  openDialog(match) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
     if (result) this.deleteCalendarMatch(match);
    });
    match.stopPropagation();
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
  deleteCalendarMatch(match) {
    this.calendarService.deleteCalendarMatch(match.path[1].childNodes[1].innerHTML).subscribe(x => {
      this.calendarMatches.splice(match.path[4].rowIndex - 1, 1);
      this.teams=[];
      this.calendarMatches.forEach(x => {
        this.teams.push(x.oponent);
      });
      this.sortTeams();
      this.setDataSource(this.calendarMatches);
    });
  }
  editOn(checked){
    // this.displayedColumns = ['edit','date', 'time', 'oponent', 'score', 'delete'];
    this.checked = checked;
    
    console.log(checked);
  }
}
