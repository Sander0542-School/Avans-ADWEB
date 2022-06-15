import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckbookListComponent} from './checkbook-list.component';

describe('CheckbookListComponent', () => {
  let component: CheckbookListComponent;
  let fixture: ComponentFixture<CheckbookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckbookListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
