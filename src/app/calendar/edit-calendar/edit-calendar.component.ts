import { Component, OnInit, ViewChild, OnChanges, DoCheck } from '@angular/core';
import { TimePickerComponent } from 'src/app/time-picker/time-picker.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarMatch } from 'src/app/models/calendar-match.model';
import { MatTable, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray, FormBuilder } from '@angular/forms';
import { TeamType } from 'src/app/models/team-type.model';
export interface PlayerGoal {
  name: string;
  surname: string;
  autoGoal: string;
}
@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.scss'],
})
export class EditCalendarComponent implements OnInit {

  teamTypes: TeamType[] = [
    { value: 'main', viewValue: 'РИВ ГОШ' },
    { value: 'd', viewValue: 'РИВ ГОШ - д' },
  ];

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  ownPlayersGoals: PlayerGoal[] = [];
  oponentPlayersGoals: PlayerGoal[] = [];
  calendarForm: FormGroup;
  players: Player[] = [];
  mainAllPurpose: Player[] = [];
  inputTime;
  step = 0;
  isPastDate;
  id;
  currentMatch;
  outputTime;
  outputScore;
  firstOutputScore: any;
  secondOutputScore: any;
  selectedPlayerGoal: any;
  setPlayersGoals: Set<PlayerGoal>;
  selectedPlayerYellowCard: any;
  selectedPlayerRedCard: any;
  playersCards: any[];

  constructor(public calendarApi: CalendarService, public playerApi: PlayerService, public activatedRoute: ActivatedRoute, public route: Router, public fb: FormBuilder) {
    playerApi.getPlayers().subscribe(x => this.players = x);
    activatedRoute.paramMap.subscribe(x => {
      this.id = x.get('id');
      if (this.id) {
        calendarApi.getMatchById(this.id).subscribe(x => {
          this.currentMatch = x;
          if (this.currentMatch) {
            this.mainAllPurpose = this.currentMatch.composition;
            this.inputTime = this.currentMatch.time;
            this.isPastDate = new Date(this.currentMatch.date) < new Date;
          };
        });
      }
    })
  }
  ngOnInit() {
    this.calendarForm = new FormGroup({
      oponentData: new FormGroup({
        oponentTeam: new FormControl('', Validators.required),
        oponentPlayers: new FormArray([]),
      }),
      calendarData: new FormGroup({
        date: new FormControl('', Validators.required),
      }),
      compositionData: new FormGroup({
        teamType: new FormControl({}),
        composition: new FormControl({})
      }),
      protocolData: new FormGroup({
        ownGoals: new FormArray([]),
        oponentGoals: new FormArray([]),
        yellowCards: new FormArray([]),
        redCards: new FormArray([]),
      }),
    })
  }
  setStep(index: number) {
    this.step = index;
  };
  nextStep() {
    this.step++;
  };
  prevStep() {
    this.step--;
  };
  updateTime(time) {
    this.outputTime = time;
  };
  updateScore(score) {
    this.outputScore = score;
  };
  updateMainAllPurpose(mainAllPurpose) {
    this.mainAllPurpose = mainAllPurpose;
  };
  onSubmitForm(formData: any, formDirective: FormGroupDirective) {
    if (this.id) {

      this.calendarApi.putMatchById(
        this.id,
        {
          date: this.calendarForm.value.calendarData.date,
          time: this.outputTime,
          oponent: this.calendarForm.value.oponentData.oponentTeam,
          score: this.outputScore,
          teamType: this.calendarForm.value.compositionData.teamType,
          composition: this.mainAllPurpose,
          oponentPlayers: this.calendarForm.value.oponentData.oponentPlayers,
          goalsList: {
            ownGoals: this.calendarForm.value.protocolData.ownGoals,
            oponentGoals: this.calendarForm.value.protocolData.oponentGoals
          },
          yellowCards: this.calendarForm.value.protocolData.yellowCards,
          redCards: this.calendarForm.value.protocolData.redCards,
          isPast: this.isPastDate,
        }).subscribe(x => {
          formDirective.resetForm();
          this.calendarForm.reset();
          this.route.navigate(['/calendar'])
        })
    }
    else {
      this.calendarApi.postCalendarMatch(
        {
          date: this.calendarForm.value.calendarData.date,
          time: this.outputTime,
          oponent: this.calendarForm.value.oponentData.oponentTeam,
          score: this.outputScore,
          teamType: this.calendarForm.value.compositionData.teamType,
          composition: this.mainAllPurpose,
          oponentPlayers: this.calendarForm.value.oponentData.oponentPlayers,
          goalsList: {
            ownGoals: this.calendarForm.value.protocolData.ownGoals,
            oponentGoals: this.calendarForm.value.protocolData.oponentGoals
          },
          yellowCards: this.calendarForm.value.protocolData.yellowCards,
          redCards: this.calendarForm.value.protocolData.redCards,
          isPast: this.isPastDate,
        }).subscribe(x => {
        })
    }

  }
  compareDate(outputIsPastDate) {
    this.isPastDate = outputIsPastDate;
  }

  updatePlayersGoals() {
    this.setStep(3);
    this.ownPlayersGoals = [];
    this.oponentPlayersGoals = [];
    this.playersCards = [];
    this.mainAllPurpose.forEach(player => {
      this.ownPlayersGoals.push({ name: player.name, surname: player.surname, autoGoal: '' })
    });
    if (this.calendarForm.controls.oponentData.status == 'VALID') {
      this.calendarForm.value.oponentData.oponentPlayers.forEach(player => {
        this.oponentPlayersGoals.push({ name: player.name, surname: player.surname, autoGoal: '' })
      })
    }

    if (this.calendarForm.controls.oponentData.status == 'VALID') {
      this.calendarForm.value.oponentData.oponentPlayers.forEach(player => {
        this.ownPlayersGoals.push({ name: player.name, surname: player.surname, autoGoal: '(Автогол)' })
      })
    }
    this.mainAllPurpose.forEach(player => {
      this.oponentPlayersGoals.push({ name: player.name, surname: player.surname, autoGoal: '(Автогол)' })
    });
    this.mainAllPurpose.forEach(player => {
      this.playersCards.push({ name: player.name, surname: player.surname, team: 'own' })
    });
    if (this.calendarForm.controls.oponentData.status == 'VALID') {
      this.calendarForm.value.oponentData.oponentPlayers.forEach(player => {
        this.playersCards.push({ name: player.name, surname: player.surname, team: 'oponent' })
      })
    }

    this.ownPlayersGoals.sort((a, b) => {
      let playerA = a.name.toLowerCase() + a.surname.toLowerCase();
      let playerB = b.name.toLowerCase() + b.surname.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
    this.ownPlayersGoals.sort((a, b) => {
      let playerA = a.autoGoal.toLowerCase();
      let playerB = b.autoGoal.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
    this.oponentPlayersGoals.sort((a, b) => {
      let playerA = a.name.toLowerCase() + a.surname.toLowerCase();
      let playerB = b.name.toLowerCase() + b.surname.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
    this.oponentPlayersGoals.sort((a, b) => {
      let playerA = a.autoGoal.toLowerCase();
      let playerB = b.autoGoal.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
    this.playersCards.sort((a, b) => {
      let playerA = a.name.toLowerCase() + a.surname.toLowerCase();
      let playerB = b.name.toLowerCase() + b.surname.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
    this.playersCards.sort((a, b) => {
      let playerA = a.team.toLowerCase();
      let playerB = b.team.toLowerCase();
      if (playerA > playerB)
        return -1;
      if (playerA < playerB)
        return 1;
      return 0;
    });
  }
}