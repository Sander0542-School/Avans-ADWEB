import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";
import {orderBy, Unsubscribe, where} from "@angular/fire/firestore";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "../../categories/dialogs/category-dialog/category-dialog.component";
import {Transaction} from "../../../../models/transaction";
import {TableAction} from "../../categories/category-list/category-list.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnChanges {

  @Input()
  public checkbook: Checkbook = {} as Checkbook;

  public categories: Category[] = [];

  private categoryUnsubscribe: Unsubscribe | undefined;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkbook']) {
      this.updateCategories();
    }
  }

  private updateCategories() {
    if (!this.checkbook.id) return;

    this.categoryUnsubscribe?.();
    this.categoryUnsubscribe = this.categoryService.getCategories(this.checkbook, snapshot => {
        this.categories = snapshot.docs.map(doc => {
          const category = doc.data() as Category;
          category.id = doc.id;
          return category
        });
      },
    );
  }

  openCategoryDialog(category?: Category) {
    this.dialog.open(CategoryDialogComponent, {
      data: {
        checkbook: this.checkbook,
        category: category
      },
    });
  }

  async deleteCategory(category: Category) {
    await this.categoryService.deleteCategory(this.checkbook, category);
  }
}
