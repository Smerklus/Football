import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Output() outputIsPastDate = new EventEmitter<boolean>();

  isPastDate: boolean;
  currentMatch: any;
  id: string;

  constructor(public activatedRoute: ActivatedRoute, public calendarApi: CalendarService) {
    activatedRoute.paramMap.subscribe(x => {
      this.id = x.get('id');
      if (this.id) {
        calendarApi.getMatchById(this.id).subscribe(x => {
          this.currentMatch = x;
          if (this.currentMatch) {
            // Патч формы календаря
            this.parentForm.patchValue({
              calendarData: {
                date: this.currentMatch.date,
              },
            });
          };
        })
      }
    })
  }

  ngOnInit() {
  }
  compareDate() {
    console.log(this.parentForm)
    this.isPastDate = new Date(this.parentForm.value.calendarData.date) < new Date;
    this.outputIsPastDate.emit(this.isPastDate);
  }

}
