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
    scrollEvent.preventDefault();
    if (scrollEvent.deltaY < 0 && this.firstScore < 50) {
      this.firstScore++;
    }
    if (scrollEvent.deltaY > 0 && this.firstScore > 0) {
      this.firstScore--;
    }
    this.addScore();

  }
  changeSecondScoreScroll(scrollEvent) {
    scrollEvent.preventDefault();
    if (scrollEvent.deltaY < 0 && this.firstScore < 50) {
      this.firstScore++;
    }
    if (scrollEvent.deltaY > 0 && this.firstScore > 0) {
      this.firstScore--;
    }
    this.addScore();
  }

  minusFirstScore(hour) {
    if (this.firstScore > 0) {
      this.firstScore--;
    }
    this.addScore();

  }
  plusFirstScore(hour) {
    if (this.firstScore < 50) {
      this.firstScore++
    }
    this.addScore();

  }
  minusSecondScore(hour) {
    if (this.secondScore > 0) {
      this.secondScore--
    }
    this.addScore();

  }
  plusSecondScore(hour) {
    if (this.secondScore < 50) {
      this.secondScore++
    }
    this.addScore();
  }

  addScore() {
    if (this.firstScore>-1 && this.secondScore>-1)
    this.score = this.firstScore + ":" + this.secondScore;
    this.onAddScore.emit(
      this.score
    )
    console.log(this.score)
  }
  deleteScore() {
    this.firstScore = "";
    this.secondScore = "";
    this.score = this.firstScore + "" + this.secondScore;
    this.onAddScore.emit(
      this.score
    )
  }

  getScore() {
    if (this.inputScore) {
      this.firstScore = +this.inputScore.split(":")[0];
      this.secondScore = +this.inputScore.split(":")[1];
    }
  }
  ngOnChanges() {
    this.getScore();
  }

  ngOnInit() {
  }

}
