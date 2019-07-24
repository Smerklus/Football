import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TrainerService } from '../services/trainers.service';
import { Trainer } from '../models/trainer.model';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-trainers-control',
  templateUrl: './trainers-control.component.html',
  styleUrls: ['./trainers-control.component.scss']
})
export class TrainersControlComponent implements OnInit {

  form: FormGroup;
  trainers: Trainer[];
  id;
  trainer;
  constructor(public trainerApi: TrainerService, public activatedRoute: ActivatedRoute) {

    // trainerApi.getTrainers().subscribe(x => this.trainers = x)
    // activatedRoute.paramMap.subscribe(x => {

    //   this.id = x.get('id');
    //   if (this.id) {
    //     this.trainerApi.getTrainerById(this.id).subscribe(x => {
    //       this.trainer = x;

    //       if (this.trainer) {
    //         this.form.patchValue({
    //           name: this.player.name,
    //           surname: this.player.surname,
    //           role: this.roles.find(z => z.value == this.player.role.value),
    //           teamType: this.teamTypes.find(z => z.value == this.player.teamType.value),
    //           number: this.player.number
    //         });
    //         // this.teamType=this.playerForm.value.teamType.value;
    //         console.log(this.playerForm)
    //       };
    //     });
    //   };
    // })
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
    // if (this.id) {

    //   this.trainerApi.putTrainerById(
    //     this.id,
    //     {
    //       name: this.form.value.name,
    //       surname: this.form.value.surname,
    //       role: this.form.value.role,
    //       teamType: this.form.value.teamType,
    //       number: this.form.value.number,
    //     }).subscribe(x => {
    //       this.trainer.getPlayers().subscribe(x => this.trainers = x);
    //       // this.table.renderRows();
    //       console.log(this.form)
    //       formDirective.resetForm();
    //       this.form.reset();
    //       console.log(this.trainers)
    //     })
    // }
    // else {
      forkJoin(
        this.trainerApi.postTrainer(
          {
            name: this.form.value.trainer.name,
            surname: this.form.value.trainer.surname,
            position: 'Тренер',
            teamType: { "value": "main", "viewValue": "РИВ ГОШ" },
          }),
        this.trainerApi.postTrainer(
          {
            name: this.form.value.captain.name,
            surname: this.form.value.captain.surname,
            position: 'Капитан',
            teamType: { "value": "main", "viewValue": "РИВ ГОШ" },
          }),
        this.trainerApi.postTrainer(
          {
            name: this.form.value.viceCaptain.name,
            surname: this.form.value.viceCaptain.surname,
            position: 'Вице-капитан',
            teamType: { "value": "main", "viewValue": "РИВ ГОШ" },
          })
      )
    .subscribe(([res1,res2,res3]) => {
        // this.trainers.push(x)
        // // this.table.renderRows();
        // console.log(this.form)
        formDirective.resetForm();
        this.form.reset();
        console.log(this.trainers)
      })
    // }
    console.log(this.form)
  }

}