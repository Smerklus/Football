import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimePipe } from '../time.pipe';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  inputHour: number = 12;
  inputMinute: number = 30;
  time;


  @Output() onAddTime = new EventEmitter<string>();

  constructor() { }



  changeHourScroll(scrollEvent) {
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 23) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    scrollEvent.path[0].value = scrollEvent.path[0].value.padStart(2, "0")
    this.inputHour = scrollEvent.path[0].value;
    this.time = this.inputHour + ":" + this.inputMinute;
  }

  changeMinuteScroll(scrollEvent) {
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 59) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    scrollEvent.path[0].value = scrollEvent.path[0].value.padStart(2, "0")
    this.inputMinute = scrollEvent.path[0].value;
    this.time = this.inputHour + ":" + this.inputMinute;
  }

  minusHour(hour) {
    if (hour.path[0].nextElementSibling.value > 0) {
      hour.path[0].nextElementSibling.value--
    }
    hour.path[0].nextElementSibling.value = hour.path[0].nextElementSibling.value.padStart(2, "0")
    this.inputHour = hour.path[0].nextElementSibling.value
    this.time = this.inputHour + ":" + this.inputMinute;

  }
  plusHour(hour) {
    if (hour.path[0].previousElementSibling.value < 23) {
      hour.path[0].previousElementSibling.value++
    }
    hour.path[0].previousElementSibling.value = hour.path[0].previousElementSibling.value.padStart(2, "0")
    this.inputHour = hour.path[0].previousElementSibling.value
    this.time = this.inputHour + ":" + this.inputMinute;

  }
  minusMinute(hour) {
    if (hour.path[0].nextElementSibling.value > 0) {
      hour.path[0].nextElementSibling.value--
    }
    hour.path[0].nextElementSibling.value = hour.path[0].nextElementSibling.value.padStart(2, "0")
    this.inputMinute = hour.path[0].nextElementSibling.value
    this.time = this.inputHour + ":" + this.inputMinute;

  }
  plusMinute(hour) {
    if (hour.path[0].previousElementSibling.value < 59) {
      hour.path[0].previousElementSibling.value++
    }
    hour.path[0].previousElementSibling.value = hour.path[0].previousElementSibling.value.padStart(2, "0")
    this.inputMinute = hour.path[0].previousElementSibling.value
    this.time = this.inputHour + ":" + this.inputMinute;
    console.log(this.time)

  }

  addTime() {
    this.time = this.inputHour + ":" + this.inputMinute;
    console.log(this.time);
    this.onAddTime.emit(this.time)
  }

  ngOnInit() {
  }

}
