import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TrainerService } from '../services/trainers.service';
import { Trainer } from '../models/trainer.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TeamType } from '../models/team-type.model';

@Component({
  selector: 'app-trainers-control',
  templateUrl: './trainers-control.component.html',
  styleUrls: ['./trainers-control.component.scss']
})
export class TrainersControlComponent implements OnInit {
  teamTypes: TeamType[] = [
    { value: 'main', viewValue: 'РИВ ГОШ' },
    { value: 'd', viewValue: 'РИВ ГОШ - д' },
  ];
  form: FormGroup;
  trainers: Trainer[];
  id;
  teamType;
  trainer;
  captain;
  viceCaptain;
  constructor(public trainerApi: TrainerService, public activatedRoute: ActivatedRoute, public router: Router) {
    this.activatedRoute.paramMap.subscribe(x => {
      this.teamType = x.get('teamType');
    });
    this.trainerApi.getTrainers().subscribe(x=>{
      this.trainers = x;
      this.trainer = this.trainers.find(trainer=>{
        return trainer.teamType.value == this.teamType && trainer.position == 'Тренер'
      })
      this.captain = this.trainers.find(captain=>{
        return captain.teamType.value == this.teamType && captain.position == 'Капитан'
      })
      this.viceCaptain = this.trainers.find(viceCaptain=>{
        return viceCaptain.teamType.value == this.teamType && viceCaptain.position == 'Вице-капитан'
      })
      this.form.patchValue({
        trainer:{
          name: this.trainer.name,
          surname: this.trainer.surname
        },
        captain:{
          name: this.captain.name,
          surname: this.captain.surname
        },
        viceCaptain:{
          name: this.viceCaptain.name,
          surname: this.viceCaptain.surname
        }
      })
    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      trainer: new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
      }),
      captain: new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
      }),
      viceCaptain: new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
      })
    })

  }

  onSubmitForm(formData: any, formDirective: FormGroupDirective) {
if(!this.trainers){
    forkJoin(
      this.trainerApi.postTrainer(
        {
          name: this.form.value.trainer.name,
          surname: this.form.value.trainer.surname,
          position: 'Тренер',
          teamType: this.teamTypes.find(x => {
          return  x.value == this.teamType
          }),
        }),
      this.trainerApi.postTrainer(
        {
          name: this.form.value.captain.name,
          surname: this.form.value.captain.surname,
          position: 'Капитан',
          teamType: this.teamTypes.find(x => {
           return x.value == this.teamType
          }),
        }),
      this.trainerApi.postTrainer(
        {
          name: this.form.value.viceCaptain.name,
          surname: this.form.value.viceCaptain.surname,
          position: 'Вице-капитан',
          teamType: this.teamTypes.find(x => {
           return x.value == this.teamType
          }),
        })
    )
      .subscribe(([res1, res2, res3]) => {
        formDirective.resetForm();
        this.form.reset();
        this.router.navigate(['/team'])
      })
    }
    else{
      forkJoin(
        this.trainerApi.putTrainerById(this.trainer.id,
          {
            name: this.form.value.trainer.name,
            surname: this.form.value.trainer.surname,
            position: 'Тренер',
            teamType: this.teamTypes.find(x => {
            return  x.value == this.teamType
            }),
          }),
        this.trainerApi.putTrainerById(this.captain.id,
          {
            name: this.form.value.captain.name,
            surname: this.form.value.captain.surname,
            position: 'Капитан',
            teamType: this.teamTypes.find(x => {
             return x.value == this.teamType
            }),
          }),
        this.trainerApi.putTrainerById(this.viceCaptain.id,
          {
            name: this.form.value.viceCaptain.name,
            surname: this.form.value.viceCaptain.surname,
            position: 'Вице-капитан',
            teamType: this.teamTypes.find(x => {
             return x.value == this.teamType
            }),
          })
      ).subscribe(([res1, res2, res3]) => {
        formDirective.resetForm();
        this.form.reset();
        this.router.navigate(['/team'])
      })
    }
  }

}