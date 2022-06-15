import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckbookArchivedComponent} from './checkbook-archived.component';

describe('CheckbookArchivedComponent', () => {
  let component: CheckbookArchivedComponent;
  let fixture: ComponentFixture<CheckbookArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckbookArchivedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
