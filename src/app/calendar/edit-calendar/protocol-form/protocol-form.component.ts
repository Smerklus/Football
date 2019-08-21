import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-protocol-form',
  templateUrl: './protocol-form.component.html',
  styleUrls: ['./protocol-form.component.scss']
})
export class ProtocolFormComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() ownPlayersGoals: any;
  @Input() oponentPlayersGoals: any;
  @Input() playersCards: any;
  @Output() onChangedScore = new EventEmitter();
  id: string;
  currentMatch: any;
  oldFirstOutputScore: any;
  oldSecondOutputScore: any;
  firstOutputScore: any;
  secondOutputScore: any;
  outputScore: any;
  selectedPlayerGoal: any;
  selectedPlayerYellowCard: any;
  selectedPlayerRedCard: any;
  inputScore: any = "0:0";
  isPastDate: boolean;

  constructor(public activatedRoute: ActivatedRoute, public calendarApi: CalendarService) {
    activatedRoute.paramMap.subscribe(x => {

      this.id = x.get('id');
      if (this.id) {
        calendarApi.getMatchById(this.id).subscribe(x => {
          this.currentMatch = x;
          if (this.currentMatch) {
            this.isPastDate = new Date(this.currentMatch.date) < new Date;
            this.inputScore = this.currentMatch.score;
            if (!this.currentMatch.score) {
              this.inputScore = "0:0"
            };
            this.outputScore = this.inputScore;
            if (this.currentMatch.goalsList) {
              this.currentMatch.goalsList.ownGoals.forEach(x => {
                (<FormArray>this.parentForm.controls.protocolData.get('ownGoals')).push(
                  new FormGroup({
                    player: new FormControl(x.player),
                    time: new FormControl(x.time)
                  })
                );
              });
              this.currentMatch.goalsList.oponentGoals.forEach(x => {
                (<FormArray>this.parentForm.controls.protocolData.get('oponentGoals')).push(
                  new FormGroup({
                    player: new FormControl(x.player),
                    time: new FormControl(x.time)
                  })
                );
              });
              this.currentMatch.yellowCards.forEach(x => {
                (<FormArray>this.parentForm.controls.protocolData.get('yellowCards')).push(
                  new FormGroup({
                    player: new FormControl(x.player),
                    time: new FormControl(x.time)
                  })
                );
              });
              this.currentMatch.redCards.forEach(x => {
                (<FormArray>this.parentForm.controls.protocolData.get('redCards')).push(
                  new FormGroup({
                    player: new FormControl(x.player),
                    time: new FormControl(x.time)
                  })
                );
              });
            };
          }
          if (this.currentMatch.score) {
            this.oldFirstOutputScore = this.currentMatch.score.split(":")[0];
            this.oldSecondOutputScore = this.currentMatch.score.split(":")[1];
          };
        })
      }
    })
  }

  ngOnInit() {
  }
  addYellowCard() {
    (<FormArray>this.parentForm.controls.protocolData.get('yellowCards')).push(
      new FormGroup({
        player: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required)
      })
    );

  }
  addRedCard() {
    (<FormArray>this.parentForm.controls.protocolData.get('redCards')).push(
      new FormGroup({
        player: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required)
      })
    );

  }

  removeYellowCard(i: number) {
    (<FormArray>this.parentForm.controls.protocolData.get('yellowCards')).removeAt(i);

  }
  removeRedCard(i: number) {
    (<FormArray>this.parentForm.controls.protocolData.get('redCards')).removeAt(i);

  }


  addOwnGoal(score) {
    if (score) {
      this.firstOutputScore = score.split(":")[0];
      console.log(this.firstOutputScore)
      this.secondOutputScore = score.split(":")[1];
    }
    if (!this.oldFirstOutputScore) {
      this.oldFirstOutputScore = 0;
    }
    console.log(this.oldFirstOutputScore)
    if (+this.oldFirstOutputScore < +this.firstOutputScore) {
      if (this.currentMatch && this.currentMatch.goalsList.ownGoals && +this.firstOutputScore <= this.currentMatch.goalsList.ownGoals.length) {
        (<FormArray>this.parentForm.controls.protocolData.get('ownGoals')).push(
          new FormGroup({
            player: new FormControl(this.currentMatch.goalsList.ownGoals[this.firstOutputScore - 1].player),
            time: new FormControl(this.currentMatch.goalsList.ownGoals[this.firstOutputScore - 1].time)
          })
        );
      }
      else {
        (<FormArray>this.parentForm.controls.protocolData.get('ownGoals')).push(
          new FormGroup({
            player: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required)
          })
        );
      }
    }
    else {
      (<FormArray>this.parentForm.controls.protocolData.get('ownGoals')).removeAt(this.firstOutputScore);
    }
    this.oldFirstOutputScore = this.firstOutputScore;
  }
  addOponentGoal(score) {
    if (score) {
      this.firstOutputScore = score.split(":")[0];
      console.log(this.firstOutputScore)
      this.secondOutputScore = score.split(":")[1];
    }
    if (!this.oldSecondOutputScore) {
      console.log(this.oldSecondOutputScore)
      this.oldSecondOutputScore = 0;
    }
    console.log(this.oldSecondOutputScore)
    if (+this.oldSecondOutputScore < +this.secondOutputScore) {
      if (this.currentMatch && this.currentMatch.goalsList.oponentGoals && +this.secondOutputScore <= this.currentMatch.goalsList.oponentGoals.length) {
        (<FormArray>this.parentForm.controls.protocolData.get('oponentGoals')).push(
          new FormGroup({
            player: new FormControl(this.currentMatch.goalsList.oponentGoals[this.secondOutputScore - 1].player),
            time: new FormControl(this.currentMatch.goalsList.oponentGoals[this.secondOutputScore - 1].time)
          })
        );
      }
      else {
        (<FormArray>this.parentForm.controls.protocolData.get('oponentGoals')).push(
          new FormGroup({
            player: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required)
          })
        );
      }
    }
    else {
      (<FormArray>this.parentForm.controls.protocolData.get('oponentGoals')).removeAt(this.secondOutputScore);
    }
    this.oldSecondOutputScore = this.secondOutputScore;
  }
  updateScore(score) {
    this.outputScore = score;
    this.addOwnGoal(this.outputScore);
    this.addOponentGoal(this.outputScore);
    this.onChangedScore.emit(this.outputScore);
  }
  public changePlayerGoal(event): void {
    this.selectedPlayerGoal = event.value;
    console.log(this.parentForm)
  }
  public changePlayerYellowCard(event): void {
    this.selectedPlayerYellowCard = event.value;
    console.log(this.parentForm)
  }
  public changePlayerRedCard(event): void {
    this.selectedPlayerRedCard = event.value;
    console.log(this.parentForm)
  }
  compareOwnFn(type1: any, type2: any): boolean {
    if (type1.name === type2.name && type1.surname === type2.surname && type1.autoGoal === type2.autoGoal) {
      return true;
    }
    else {
      return false;
    }
  }
  compareOponentFn(type1: any, type2: any): boolean {
    if (type1.name === type2.name && type1.surname === type2.surname && type1.autoGoal === type2.autoGoal) {
      return true;
    }
    else {
      return false;
    }
  }
  compareYellowCardFn(type1: any, type2: any): boolean {
    if (type1.name === type2.name && type1.surname === type2.surname && type1.autoGoal === type2.autoGoal) {
      return true;
    }
    else {
      return false;
    }
  }
  compareRedCardFn(type1: any, type2: any): boolean {
    if (type1.name === type2.name && type1.surname === type2.surname && type1.autoGoal === type2.autoGoal) {
      return true;
    }
    else {
      return false;
    }
  }
}
