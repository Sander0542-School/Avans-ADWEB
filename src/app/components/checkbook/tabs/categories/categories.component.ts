import {Component, Input} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";
import {Category} from "../../../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../../../services/category.service";
import {CategoryDialogComponent} from "../../categories/dialogs/category-dialog/category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input()
  public checkbook: Checkbook = {} as Checkbook;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {
  }

  openCategoryDialog(category?: Category) {
  }

  async deleteCategory(category: Category) {
    await this.categoryService.deleteCategory(this.checkbook, category);
  }

}
