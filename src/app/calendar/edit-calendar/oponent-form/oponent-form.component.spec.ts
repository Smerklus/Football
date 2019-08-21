import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OponentFormComponent } from './oponent-form.component';

describe('OponentFormComponent', () => {
  let component: OponentFormComponent;
  let fixture: ComponentFixture<OponentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OponentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OponentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
