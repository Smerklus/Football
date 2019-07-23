import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { TimePickerComponent } from 'src/app/time-picker/time-picker.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarMatch } from 'src/app/models/calendar-match.model';
import { MatTable } from '@angular/material';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.scss']
})
export class EditCalendarComponent implements OnChanges, OnInit {

  inputDate;
  inputTime;
  inputOponent;
  inputScore;
  calendarMatches: CalendarMatch[] = [];
  players: Player[] = [];
  teamType;
  step = 0;
  isPastDate;
  id;
  currentMatch;
  outputTime;
  outputScore;
  todayDate;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  constructor(public calendarApi: CalendarService, public playerApi: PlayerService, public activatedRoute: ActivatedRoute, public route: Router) {
    this.id = activatedRoute.snapshot.params['id'];
    if(this.id){
    calendarApi.getMatchById(this.id).subscribe(x => {
      this.currentMatch = x;

      if (this.currentMatch) {
        this.inputTime = this.currentMatch.time;
        this.inputDate = this.currentMatch.date;
        this.inputOponent = this.currentMatch.oponent;
        this.inputScore = this.currentMatch.score;
        this.isPastDate = new Date(this.inputDate) < new Date;

      };
    });
  }
      playerApi.getPlayers().subscribe(x => this.players = x);
    

  }

  chooseMainTeam(value) {
    this.teamType = value;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  updateTime(time) {
    this.outputTime = time;
  }
  updateScore(score) {
    this.outputScore = score;
  }

  addCalendarMatch() {
    this.calendarApi.postCalendarMatch(
      {
        date: this.inputDate,
        time: this.outputTime,
        oponent: this.inputOponent,
        score: this.outputScore,
      }).subscribe(x => {
        this.calendarMatches.push(x)
        console.log(this.calendarMatches)
        this.route.navigate(['/calendar'])
      })
      
  };
  editCalendarMatch() {
    this.calendarApi.putMatchById(this.id, 
      {
        date: this.inputDate,
        time: this.outputTime,
        oponent: this.inputOponent,
        score: this.outputScore,
      })
      .subscribe(x=>{
      //   x => {
      //   this.calendarMatches.push(x)
      //   console.log(this.calendarMatches)
      // }
      this.route.navigate(['/calendar'])
      }
      )
      
  };

  ngOnChanges() {
  }

  ngOnInit() {

  }
  compareDate() {
    this.isPastDate = this.inputDate < new Date;
  }
}
