import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedCardComponent } from './red-card.component';

describe('RedCardComponent', () => {
  let component: RedCardComponent;
  let fixture: ComponentFixture<RedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
