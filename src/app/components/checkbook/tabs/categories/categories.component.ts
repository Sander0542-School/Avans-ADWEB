import {Component, Input, OnInit} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "../../categories/dialogs/category-dialog/category-dialog.component";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input()
  public checkbook!: Observable<Checkbook>;
  private checkbookCache!: Checkbook;

  public categories!: Observable<Category[]>;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categories = this.checkbook.pipe(
      switchMap(checkbook => {
        this.checkbookCache = checkbook;
        return this.categoryService.getCategories(checkbook);
      })
    )
  }

  createCategory() {
    if (this.checkbookCache) {
      this.dialog.open(CategoryDialogComponent, {
        data: {
          checkbook: this.checkbookCache
        }
      });
    }
  }
}
