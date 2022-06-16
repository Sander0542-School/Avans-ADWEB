import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";
import {orderBy, Unsubscribe, where} from "@angular/fire/firestore";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "../../categories/dialogs/category-dialog/category-dialog.component";
import {Transaction} from "../../../../models/transaction";
import {TableAction} from "../../categories/category-list/category-list.component";
import {combineLatest, Observable, switchMap} from "rxjs";

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

  public listActions: TableAction[] = [
    {
      name: 'Edit',
      action: (category: Category) => this.openCategoryDialog(category),
    },
    {
      name: 'Delete',
      action: (category: Category) => this.deleteCategory(category),
    }
  ]

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

  openCategoryDialog(category?: Category) {
    this.dialog.open(CategoryDialogComponent, {
      data: {
        checkbook: this.checkbookCache,
        category: category
      },
    });
  }

  async deleteCategory(category: Category) {
    await this.categoryService.deleteCategory(this.checkbookCache, category);
  }
}
