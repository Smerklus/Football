import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { TimePickerComponent } from 'src/app/time-picker/time-picker.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarMatch } from 'src/app/models/calendar-match.model';
import { MatTable, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.scss'],
  // providers: [
  //   {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
  // ]
})
export class EditCalendarComponent implements OnChanges, OnInit {

  inputDate;
  inputTime;
  inputOponent;
  inputScore;
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
  tape = [null, true];

  done = null;

  doneControl = new FormControl(null);

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

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
            this.calendarForm.patchValue({
              calendarData: {
                date: this.currentMatch.date,
              },
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
  }

  // addCalendarMatch() {
  //   this.calendarApi.postCalendarMatch(
  //     {
  //       date: this.inputDate,
  //       time: this.outputTime,
  //       oponent: this.inputOponent,
  //       score: this.outputScore,
  //     }).subscribe(x => {
  //       this.calendarMatches.push(x)
  //       console.log(this.calendarMatches)
  //       this.route.navigate(['/calendar'])
  //     })

  // };

  onSubmitForm(formData: any, formDirective: FormGroupDirective) {
    if (this.id) {

      this.calendarApi.putMatchById(
        this.id,
        {
          date: this.calendarForm.value.calendarData.date,
          time: this.outputTime,
          oponent: this.calendarForm.value.oponentData.oponentTeam,
          score: this.outputScore,
          composition: this.mainAllPurpose,
          oponentPlayers: this.calendarForm.value.oponentData.oponentPlayers
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
          composition: this.mainAllPurpose,
          oponentPlayers: this.calendarForm.value.oponentData.oponentPlayers
        }).subscribe(x => {
          console.log(this.calendarForm)
          // formDirective.resetForm();
          // this.calendarForm.reset();
        })
    }

  }

  // editCalendarMatch() {
  //   this.calendarApi.putMatchById(this.id, 
  //     {
  //       date: this.inputDate,
  //       time: this.outputTime,
  //       oponent: this.inputOponent,
  //       score: this.outputScore,
  //     })
  //     .subscribe(x=>{
  //     //   x => {
  //     //   this.calendarMatches.push(x)
  //     //   console.log(this.calendarMatches)
  //     // }
  //     this.route.navigate(['/calendar'])
  //     }
  //     )

  // };

  ngOnChanges() {
  }

  ngOnInit() {
    // this.calendarForm = this.fb.group({
    //   date:this.fb.control({}),
    //   oponent:this.fb.control({}),
    //   composition:this.fb.array([])
    // })


    this.calendarForm = new FormGroup({
      oponentData: new FormGroup({
        oponentTeam: new FormControl('', Validators.required),
        oponentPlayers: new FormArray([]),
      }),
      calendarData: new FormGroup({
        date: new FormControl('', Validators.required),
      }),
      compositionData: new FormGroup({
        composition: new FormControl({})
      }),
    });
  }

  compareDate() {
    this.isPastDate = new Date(this.calendarForm.value.calendarData.date) < new Date;
  }

  //   addMainAllPurpose(player){
  // this.mainAllPurpose.push({player,this.isChecked})

  // console.log(player)
  // console.log(this.mainAllPurpose)
  // console.log(this.calendarForm)

  //   }
  onChange(event, player) {
    console.log(event)
    console.log(player)
    if (event.checked) {
      if (!this.mainAllPurpose) {
        this.mainAllPurpose = [];
      }
      this.mainAllPurpose.push(player)
    } else {
      let indexSamePlayer = this.mainAllPurpose.findIndex(x => x.id == player.id)
      this.mainAllPurpose.splice(indexSamePlayer, 1)
    }
    
    console.log(this.mainAllPurpose)

  }

  isPlayerChecked(player) {
    if (this.currentMatch && this.currentMatch.composition) {
      return this.currentMatch.composition.some(x => x.id == player.id)
    }
  }

  isDisabledBox(player){
   let isChecked = this.mainAllPurpose.some(x=>x.id == player.id)
    if (this.mainAllPurpose.length > 4 && !isChecked)  {
      return true;
    }
    else {
      return false;
    }

  }

  addOponent() {
    (<FormArray>this.calendarForm.controls.oponentData.get('oponentPlayers')).push(
      new FormGroup({
        name: new FormControl(),
        surname: new FormControl()
      })
    );
  }

  removeOponent(i: number) {
    (<FormArray>this.calendarForm.controls.oponentData.get('oponentPlayers')).removeAt(i);
  }

}