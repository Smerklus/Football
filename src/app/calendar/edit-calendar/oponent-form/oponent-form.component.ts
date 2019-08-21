import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-oponent-form',
  templateUrl: './oponent-form.component.html',
  styleUrls: ['./oponent-form.component.scss']
})
export class OponentFormComponent implements OnInit {

  @Input() parentForm: FormGroup;
  id: string;
  currentMatch: any;

  constructor(public activatedRoute: ActivatedRoute, public calendarApi: CalendarService) {
    activatedRoute.paramMap.subscribe(x => {

      this.id = x.get('id');
      if (this.id) {
        calendarApi.getMatchById(this.id).subscribe(x => {
          this.currentMatch = x;
          // Заполнение массива опонентов из БД
          if (this.currentMatch.oponentPlayers) {
            this.currentMatch.oponentPlayers.forEach(x => {
              (<FormArray>this.parentForm.controls.oponentData.get('oponentPlayers')).push(
                new FormGroup({
                  name: new FormControl(x.name),
                  surname: new FormControl(x.surname)
                })
              );
            });
          };

          this.parentForm.patchValue({
            oponentData: {
              oponentTeam: this.currentMatch.oponent,
            }
          })
        })
      }
    })
  }

  ngOnInit() {
  }

  addOponent() {
    (<FormArray>this.parentForm.controls.oponentData.get('oponentPlayers')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required)
      })
    );
  }

  removeOponent(i: number) {
    (<FormArray>this.parentForm.controls.oponentData.get('oponentPlayers')).removeAt(i);
  }
}
