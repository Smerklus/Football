import { Component, OnInit, ViewChild } from '@angular/core';
import { TimePickerComponent } from 'src/app/time-picker/time-picker.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarMatch } from 'src/app/models/calendar-match.model';
import { MatTable } from '@angular/material';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.scss']
})
export class EditCalendarComponent implements OnInit {

  inputData;
  inputTime;
  inputOponent;
  inputScore;
  calendarMatches: CalendarMatch[] = [];
  players: Player[] =[];
  teamType;
  step = 0;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  constructor(public calendarApi: CalendarService,public playerApi: PlayerService) {
    calendarApi.getCalendarMatches().subscribe(x => this.calendarMatches = x);
    playerApi.getPlayers().subscribe(x=>this.players = x);
  }

  chooseMainTeam(value){
this.teamType=value;
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
    this.inputTime = time;
  }
  updateScore(score) {
    this.inputScore = score;
  }

  addCalendarMatch() {
    this.calendarApi.postCalendarMatch(
      {
        data: this.inputData,
        time: this.inputTime,
        oponent: this.inputOponent,
        score: this.inputScore,
      }).subscribe(x => {
        this.calendarMatches.push(x)
        console.log(this.calendarMatches)
      })

  };

  ngOnInit() {
  }

}
