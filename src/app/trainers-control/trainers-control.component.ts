import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-trainers-control',
  templateUrl: './trainers-control.component.html',
  styleUrls: ['./trainers-control.component.scss']
})
export class TrainersControlComponent implements OnInit {

  form: FormGroup;

  constructor() { }

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

onSubmitPlayerForm(formData: any, formDirective: FormGroupDirective) {
  // if (this.id) {

  //   this.playerApi.putPlayerById(
  //     this.id,
  //     {
  //       name: this.playerForm.value.name,
  //       surname: this.playerForm.value.surname,
  //       role: this.playerForm.value.role,
  //       teamType: this.playerForm.value.teamType,
  //       number: this.playerForm.value.number,
  //     }).subscribe(x => {
  //       this.playerApi.getPlayers().subscribe(x => this.players = x);
  //       this.table.renderRows();
  //       console.log(this.playerForm)
  //       formDirective.resetForm();
  //       this.playerForm.reset();
  //       console.log(this.players)
  //     })
  // }
  // else {
  //   this.playerApi.postPlayer(
  //     {
  //       name: this.playerForm.value.name,
  //       surname: this.playerForm.value.surname,
  //       role: this.playerForm.value.role,
  //       teamType: this.playerForm.value.teamType,
  //       number: this.playerForm.value.number,
  //     }).subscribe(x => {
  //       this.players.push(x)
  //       this.table.renderRows();
  //       console.log(this.playerForm)
  //       formDirective.resetForm();
  //       this.playerForm.reset();
  //       console.log(this.players)
  //     })
  // }
console.log(this.form)
}

}