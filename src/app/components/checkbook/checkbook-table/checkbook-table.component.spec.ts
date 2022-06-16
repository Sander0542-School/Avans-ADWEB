import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookTableComponent } from './checkbook-table.component';

describe('CheckbookTableComponent', () => {
  let component: CheckbookTableComponent;
  let fixture: ComponentFixture<CheckbookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbookTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
