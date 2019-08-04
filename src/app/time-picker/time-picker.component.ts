import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, AfterViewChecked, DoCheck, OnChanges } from '@angular/core';
import { TimePipe } from '../time.pipe';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnChanges, OnInit, DoCheck {

  inputHour;
  inputMinute;
  time;

  @Input() inputTime: string;
  @Output() inputTimeChange = new EventEmitter<string>();

  constructor() {

  }



  changeHourScroll(scrollEvent) {
    scrollEvent.preventDefault();
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 23) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    scrollEvent.path[0].value = scrollEvent.path[0].value.padStart(2, "0")
    this.inputHour = scrollEvent.path[0].value;
    this.addTime();
  }

  changeMinuteScroll(scrollEvent) {
    scrollEvent.preventDefault();
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 59) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    scrollEvent.path[0].value = scrollEvent.path[0].value.padStart(2, "0")
    this.inputMinute = scrollEvent.path[0].value;
    this.addTime();
  }

  minusHour(hour) {
    if (hour.path[1].nextElementSibling.value > 0) {
      hour.path[1].nextElementSibling.value--
    }
    hour.path[1].nextElementSibling.value = hour.path[1].nextElementSibling.value.padStart(2, "0")
    this.inputHour = hour.path[1].nextElementSibling.value
    this.addTime();
  }
  plusHour(hour) {
    if (hour.path[1].previousElementSibling.value < 23) {
      hour.path[1].previousElementSibling.value++
    }
    hour.path[1].previousElementSibling.value = hour.path[1].previousElementSibling.value.padStart(2, "0")
    this.inputHour = hour.path[1].previousElementSibling.value
    this.addTime();
  }
  minusMinute(hour) {
    if (hour.path[1].nextElementSibling.value > 0) {
      hour.path[1].nextElementSibling.value--
    }
    hour.path[1].nextElementSibling.value = hour.path[1].nextElementSibling.value.padStart(2, "0")
    this.inputMinute = hour.path[1].nextElementSibling.value
    this.addTime();
  }
  plusMinute(hour) {
    if (hour.path[1].previousElementSibling.value < 59) {
      hour.path[1].previousElementSibling.value++
    }
    hour.path[1].previousElementSibling.value = hour.path[1].previousElementSibling.value.padStart(2, "0")
    this.inputMinute = hour.path[1].previousElementSibling.value

    this.addTime();

  }
  getTime() {
    if (this.inputTime) {
      this.inputHour = this.inputTime.split(":")[0].padStart(2, "0");
      this.inputMinute = this.inputTime.split(":")[1].padStart(2, "0");
    }
  }
  addTime() {
    this.time = this.inputHour + ":" + this.inputMinute;
    this.inputTimeChange.emit(this.time)
  }

  ngOnChanges() {
    this.getTime();
    this.addTime();

  }

  ngOnInit() {
    if (!this.inputTime) {
      this.inputTime = "12:00";
      this.getTime();
      this.addTime();

    }
  }

  ngDoCheck() {

  }

}
