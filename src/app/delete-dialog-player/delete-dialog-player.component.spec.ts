import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogPlayerComponent } from './delete-dialog-player.component';

describe('DeleteDialogPlayerComponent', () => {
  let component: DeleteDialogPlayerComponent;
  let fixture: ComponentFixture<DeleteDialogPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
