import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookCreateComponent } from './checkbook-create.component';

describe('CheckbookCreateComponent', () => {
  let component: CheckbookCreateComponent;
  let fixture: ComponentFixture<CheckbookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbookCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
});
