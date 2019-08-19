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
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
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

  displayedColumns: string[] = ['edit', 'date', 'time', 'oponent', 'score', 'delete'];
  dataSource: MatTableDataSource<CalendarMatch>;
  expandedElement: CalendarMatch | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  selectedTeamType: any;

  teams = [];
  teamsSet;
  checked;
  allGoalsList: any;

  constructor(public calendarService: CalendarService, public dialog: MatDialog) {
    calendarService.getCalendarMatches().subscribe(x => {
      this.addSortGoalsList(this.calendarMatches = x)
      console.log(this.calendarMatches)
      this.setDataSource(this.calendarMatches);
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
    console.log(this.dataSource)
  }
  deleteCalendarMatch(match) {
    this.calendarService.deleteCalendarMatch(match.path[1].childNodes[1].innerHTML).subscribe(x => {
      this.calendarMatches.splice(match.path[4].rowIndex - 1, 1);
      this.teams = [];
      this.calendarMatches.forEach(x => {
        this.teams.push(x.oponent);
      });
      this.sortTeams();
      this.setDataSource(this.calendarMatches);
    });
  }

  editOn(checked) {
    // this.displayedColumns = ['edit','date', 'time', 'oponent', 'score', 'delete'];
    this.checked = checked;

    console.log(checked);
  }

  isTeamType(composition) {
    composition.forEach(x => {
      return x.teamType.viewValue;
    })
  }

  addSortGoalsList(calendarMatches) {
calendarMatches.forEach(match=>{
  this.allGoalsList = [];
  match.goalsList.ownGoals.forEach(ownGoal => {
    this.allGoalsList.push({name: ownGoal.player.name,surname: ownGoal.player.surname,time: ownGoal.time, team: "own", type: 'goal'});
  });
  match.goalsList.oponentGoals.forEach(oponentGoal => {
    this.allGoalsList.push({name: oponentGoal.player.name,surname: oponentGoal.player.surname,time: oponentGoal.time, team: "oponent", type: 'goal'})
  });
  // if (match.goalsList.yellowCards && match.goalsList.redCards){
  match.yellowCards.forEach(yellowCard=>{
    this.allGoalsList.push({name: yellowCard.player.name,surname: yellowCard.player.surname,time: yellowCard.time, team: yellowCard.player.team, type: 'yellowCard'})
  })
  match.redCards.forEach(redCard=>{
    this.allGoalsList.push({name: redCard.player.name,surname: redCard.player.surname,time: redCard.time, team: redCard.player.team, type: 'redCard'})
  })
// }
  this.allGoalsList.sort((a, b) => {
    let timeGoalA = a.time;
    let timeGoalB = b.time;
    if (timeGoalA < timeGoalB)
      return -1;
    if (timeGoalA > timeGoalB)
      return 1;
    return 0;
  });
  match.sortedGoalsList = this.allGoalsList;
  console.log(this.allGoalsList)
})
  }
}
