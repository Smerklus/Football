import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-score-picker',
  templateUrl: './game-score-picker.component.html',
  styleUrls: ['./game-score-picker.component.scss']
})
export class GameScorePickerComponent implements OnInit {

  firstScore = 0;
  secondScore = 0;
  score;

  @Output() onAddScore = new EventEmitter< string >();

  constructor() { }

  changeFirstScoreScroll(scrollEvent) {
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 50) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    this.firstScore = scrollEvent.path[0].value;

  }
  changeSecondScoreScroll(scrollEvent) {
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 50) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    this.secondScore = scrollEvent.path[0].value;

  }

  minusFirstScore(hour) {
    if (hour.path[0].nextElementSibling.value > 0) {
      hour.path[0].nextElementSibling.value--
    }
    this.firstScore = hour.path[0].nextElementSibling.value;
  }
  plusFirstScore(hour) {
    if (hour.path[0].previousElementSibling.value < 50) {
      hour.path[0].previousElementSibling.value++
    }
    this.firstScore = hour.path[0].previousElementSibling.value;
  }
  minusSecondScore(hour) {
    if (hour.path[0].nextElementSibling.value > 0) {
      hour.path[0].nextElementSibling.value--
    }
    this.secondScore = hour.path[0].nextElementSibling.value;
  }
  plusSecondScore(hour) {
    if (hour.path[0].previousElementSibling.value < 50) {
      hour.path[0].previousElementSibling.value++
    }
    this.secondScore = hour.path[0].previousElementSibling.value;
    console.log(this.firstScore);
  }

  addScore() {
    this.score = this.firstScore + ":" + this.secondScore;
    console.log(this.score);
    this.onAddScore.emit(
      this.score
    )
  }
  ngOnInit() {
  }

}
