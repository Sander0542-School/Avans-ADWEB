import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGraphComponent } from './category-graph.component';

describe('CategoryGraphComponent', () => {
  let component: CategoryGraphComponent;
  let fixture: ComponentFixture<CategoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
