import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookDialogComponent } from './checkbook-dialog.component';

describe('CheckbookDialogComponent', () => {
  let component: CheckbookDialogComponent;
  let fixture: ComponentFixture<CheckbookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
