import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScorePickerComponent } from './game-score-picker.component';

describe('GameScorePickerComponent', () => {
  let component: GameScorePickerComponent;
  let fixture: ComponentFixture<GameScorePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScorePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScorePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
