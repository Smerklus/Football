import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersControlComponent } from './trainers-control.component';

describe('TrainersControlComponent', () => {
  let component: TrainersControlComponent;
  let fixture: ComponentFixture<TrainersControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
