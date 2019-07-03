import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCompositionComponent } from './match-composition.component';

describe('MatchCompositionComponent', () => {
  let component: MatchCompositionComponent;
  let fixture: ComponentFixture<MatchCompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
