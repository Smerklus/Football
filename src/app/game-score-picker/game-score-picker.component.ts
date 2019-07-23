import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-game-score-picker',
  templateUrl: './game-score-picker.component.html',
  styleUrls: ['./game-score-picker.component.scss']
})
export class GameScorePickerComponent implements OnChanges, OnInit {

  firstScore;
  secondScore;
  score;

  @Input() inputScore;
  @Output() onAddScore = new EventEmitter<string>();

  constructor() { }

  changeFirstScoreScroll(scrollEvent) {
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 50) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    this.firstScore = scrollEvent.path[0].value;
    this.addScore();
  }
  changeSecondScoreScroll(scrollEvent) {
    if (scrollEvent.deltaY < 0 && scrollEvent.path[0].value < 50) {
      scrollEvent.path[0].value++;
    }
    if (scrollEvent.deltaY > 0 && scrollEvent.path[0].value > 0) {
      scrollEvent.path[0].value--;
    }
    this.secondScore = scrollEvent.path[0].value;
    this.addScore();

  }

  minusFirstScore(hour) {
    if (hour.path[0].nextElementSibling.value > 0) {
      hour.path[0].nextElementSibling.value--
    }
    this.firstScore = hour.path[0].nextElementSibling.value;
    this.addScore();

  }
  plusFirstScore(hour) {
    if (hour.path[0].previousElementSibling.value < 50) {
      hour.path[0].previousElementSibling.value++
    }
    this.firstScore = hour.path[0].previousElementSibling.value;
    this.addScore();

  }
  minusSecondScore(hour) {
    if (hour.path[0].nextElementSibling.value > 0) {
      hour.path[0].nextElementSibling.value--
    }
    this.secondScore = hour.path[0].nextElementSibling.value;
    this.addScore();

  }
  plusSecondScore(hour) {
    if (hour.path[0].previousElementSibling.value < 50) {
      hour.path[0].previousElementSibling.value++
    }
    this.secondScore = hour.path[0].previousElementSibling.value;
    this.addScore();

    console.log(this.firstScore);
  }

  addScore() {
    if (this.firstScore && this.secondScore)
    this.score = this.firstScore + ":" + this.secondScore;
    console.log(this.score);
    this.onAddScore.emit(
      this.score
    )
  }
  deleteScore() {
    this.firstScore = "";
    this.secondScore = "";
    this.score = this.firstScore + "" + this.secondScore;
    console.log(this.score);
    this.onAddScore.emit(
      this.score
    )
  }

  getScore() {
    console.log(this.inputScore)
    if (this.inputScore) {
      this.firstScore = +this.inputScore.split(":")[0];
      this.secondScore = +this.inputScore.split(":")[1];
    }
  }
  ngOnChanges() {
    this.getScore();
    this.addScore();
  }

  ngOnInit() {
  }

}
