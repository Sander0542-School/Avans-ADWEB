import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {Checkbook} from "../../../../models/checkbook";
import {CategoryDialogComponent} from "../dialogs/category-dialog/category-dialog.component";
import {CategoryService} from "../../../../services/category.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnInit {

  @Input()
  public checkbook!: Checkbook | null;

  @Input()
  public category!: Category

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  editCategory() {
    this.dialog.open(CategoryDialogComponent, {
      data: {
        checkbook: this.checkbook,
        category: this.category
      },
    });
  }

  async deleteCategory() {
    if (this.checkbook) {
      await this.categoryService.deleteCategory(this.checkbook, this.category);
    }
  }

}
