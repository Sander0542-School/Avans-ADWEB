import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookEditComponent } from './checkbook-edit.component';

describe('CheckbookEditComponent', () => {
  let component: CheckbookEditComponent;
  let fixture: ComponentFixture<CheckbookEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbookEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});
