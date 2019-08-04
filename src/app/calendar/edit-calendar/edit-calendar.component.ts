import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
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
  // providers: [
  //   {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
  // ]
})
export class EditCalendarComponent implements OnChanges, OnInit {

  teamTypes: TeamType[] = [
    { value: 'main', viewValue: 'РИВ ГОШ' },
    { value: 'd', viewValue: 'РИВ ГОШ - д' },
  ];

  playersGoals: PlayerGoal[] = [];

  inputDate;
  inputTime;
  inputOponent;
  inputScore = '0:0';
  calendarMatches: CalendarMatch[] = [];
  players: Player[] = [];
  mainAllPurpose: Player[] = [];
  teamType;
  step = 0;
  isPastDate;
  id;
  currentMatch;
  outputTime;
  outputScore;
  todayDate;
  calendarForm: FormGroup;
  isChecked;
  inputChecked;
  indexSamePlayer;
  isDisabled;
  selectedTeamType = 'main';
  oldFirstOutputScore;

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  firstOutputScore: any;
  secondOutputScore: any;
  selectedPlayerGoal: any;
  setPlayersGoals: Set<PlayerGoal>;


  constructor(public calendarApi: CalendarService, public playerApi: PlayerService, public activatedRoute: ActivatedRoute, public route: Router, public fb: FormBuilder) {
    playerApi.getPlayers().subscribe(x => this.players = x);
    activatedRoute.paramMap.subscribe(x => {

      this.id = x.get('id');
      if (this.id) {
        calendarApi.getMatchById(this.id).subscribe(x => {
          this.currentMatch = x;

          if (this.currentMatch) {
            this.inputScore = this.currentMatch.score;
            this.inputTime = this.currentMatch.time;
            this.isPastDate = new Date(this.currentMatch.date) < new Date;
            this.mainAllPurpose = this.currentMatch.composition;
            this.oldFirstOutputScore = this.currentMatch.score.split(":")[0];
            // Костыль для отсутствующих TeamType
            if (this.currentMatch.teamType) {
              this.selectedTeamType = this.currentMatch.teamType;
              this.calendarForm.patchValue({
                compositionData: {
                  teamType: this.teamTypes.find(z => z.value == this.currentMatch.teamType.value),
                },
              })
            }

            // Заполнение массивы опонентов из БД
            if (this.currentMatch.oponentPlayers) {
              this.currentMatch.oponentPlayers.forEach(x => {
                (<FormArray>this.calendarForm.controls.oponentData.get('oponentPlayers')).push(
                  new FormGroup({
                    name: new FormControl(x.name),
                    surname: new FormControl(x.surname)
                  })
                );
              });
            };
            if (this.currentMatch.goalsList) {
              this.currentMatch.goalsList.forEach(x => {
                (<FormArray>this.calendarForm.controls.protocolData.get('goals')).push(
                  new FormGroup({
                    player: new FormControl(x.player),
                    time: new FormControl(x.time)
                  })
                );
              });
            };

            // Патч формы календаря
            this.calendarForm.patchValue({
              calendarData: {
                date: this.currentMatch.date,
              },
              // compositionData: {
              //   teamType: this.teamTypes.find(z => z.value == this.currentMatch.teamType.value),
              // },
              oponentData: {
                oponentTeam: this.currentMatch.oponent,
              }
            });
            console.log(this.calendarForm)
          };
        });
      }



    })
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
    this.addGoal(this.outputScore);
  }

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
          goalsList: this.calendarForm.value.protocolData.goals,
        }).subscribe(x => {
          console.log(this.calendarForm)
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
          goalsList: this.calendarForm.value.protocolData.goals,
        }).subscribe(x => {
          console.log(this.calendarForm)
        })
    }

  }

  ngOnChanges() {
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
        goals: new FormArray([])
      }),
    })
  }

  compareDate() {
    this.isPastDate = new Date(this.calendarForm.value.calendarData.date) < new Date;
  }

  onChange(event, player) {

    console.log(event)
    console.log(player)
    if (event.checked) {
      if (!this.mainAllPurpose) {
        this.mainAllPurpose = [];
      }
      this.mainAllPurpose.push(player)
    }
    else {
      let indexSamePlayer = this.mainAllPurpose.findIndex(x => x.id == player.id)
      this.mainAllPurpose.splice(indexSamePlayer, 1)
    }
  }

  isPlayerChecked(player) {
    if (this.currentMatch && this.currentMatch.composition) {
      return this.currentMatch.composition.some(x => x.id == player.id)
    }
  }

  isDisabledAllPurpose(player) {
    if (this.mainAllPurpose) {
      let allPurposes = []
      this.mainAllPurpose.forEach(x => {
        if (x.role.value == 'all-purpose') {
          allPurposes.push(x)
        }
      })
      let isChecked = this.mainAllPurpose.some(z => z.id == player.id)
      if (allPurposes.length > 3 && !isChecked) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  isDisabledGoalkeepers(player) {
    if (this.mainAllPurpose) {
      let goalkeepers = []
      this.mainAllPurpose.forEach(x => {
        if (x.role.value == 'goalkeeper') {
          goalkeepers.push(x)
        }
      })
      let isChecked = this.mainAllPurpose.some(z => z.id == player.id)
      if (goalkeepers.length > 0 && !isChecked) {
        return true;
      }
      else {
        return false;
      }
    }
  }


  isDisabledSelect() {
    if (this.calendarForm.value.compositionData.teamType.value && this.mainAllPurpose)
      return this.mainAllPurpose.length > 0;
  }

  addOponent() {
    (<FormArray>this.calendarForm.controls.oponentData.get('oponentPlayers')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
      })
    );

  }

  removeOponent(i: number) {
    (<FormArray>this.calendarForm.controls.oponentData.get('oponentPlayers')).removeAt(i);

  }

  addGoal(score) {
    if (score) {
      this.firstOutputScore = score.split(":")[0];
      console.log(this.firstOutputScore)
      this.secondOutputScore = score.split(":")[1];
    }
    console.log(this.oldFirstOutputScore)
    if (+this.oldFirstOutputScore < +this.firstOutputScore) {
      if (+this.firstOutputScore <= this.currentMatch.goalsList.length) {
        (<FormArray>this.calendarForm.controls.protocolData.get('goals')).push(
          new FormGroup({
            player: new FormControl(this.currentMatch.goalsList[this.firstOutputScore - 1].player),
            time: new FormControl(this.currentMatch.goalsList[this.firstOutputScore - 1].time)
          })
        );
      }
      else {
        (<FormArray>this.calendarForm.controls.protocolData.get('goals')).push(
          new FormGroup({
            player: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required)
          })
        );
      }
    }
    else {
      (<FormArray>this.calendarForm.controls.protocolData.get('goals')).removeAt(this.firstOutputScore );
    }
    this.oldFirstOutputScore = this.firstOutputScore;
  }

  updatePlayersGoals() {
    this.setStep(3);
    this.playersGoals = [];
    this.mainAllPurpose.forEach(player => {
      this.playersGoals.push({ name: player.name, surname: player.surname, autoGoal: '' })
    });

    if (this.calendarForm.controls.oponentData.status == 'VALID') {
      this.calendarForm.value.oponentData.oponentPlayers.forEach(player => {
        this.playersGoals.push({ name: player.name, surname: player.surname, autoGoal: '(Автогол)' })
      })
    }
    this.playersGoals.sort((a, b) => {
      let playerA = a.name.toLowerCase() + a.surname.toLowerCase();
      let playerB = b.name.toLowerCase() + b.surname.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
    this.playersGoals.sort((a, b) => {
      let playerA = a.autoGoal.toLowerCase();
      let playerB = b.autoGoal.toLowerCase();
      if (playerA < playerB)
        return -1;
      if (playerA > playerB)
        return 1;
      return 0;
    });
  }

  public changeTeamType(event): void {
    this.selectedTeamType = event.value;
  }
  public changePlayerGoal(event): void {
    this.selectedPlayerGoal = event.value;
  }

}