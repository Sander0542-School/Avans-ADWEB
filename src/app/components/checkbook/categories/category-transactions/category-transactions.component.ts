import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {Checkbook} from "../../../../models/checkbook";
import {CategoryDialogComponent} from "../dialogs/category-dialog/category-dialog.component";
import {CategoryService} from "../../../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable, switchMap} from "rxjs";
import {TransactionService} from "../../../../services/transaction.service";
import {Transaction} from "../../../../models/transaction";
import {TransactionCreateComponent} from "../../transactions/dialogs/transaction-create/transaction-create.component";

@Component({
  selector: 'app-category-transactions',
  templateUrl: './category-transactions.component.html',
  styleUrls: ['./category-transactions.component.scss']
})
export class CategoryTransactionsComponent implements OnInit {

  @Input()
  public checkbook!: Observable<Checkbook>;
  public checkbookCache!: Checkbook;

  @Input()
  public category!: Category

  public transactions!: Observable<Transaction[]>;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.transactions = this.checkbook.pipe(switchMap(checkbook => {
      this.checkbookCache = checkbook;
      return this.transactionService.getTransactionsByCategory(checkbook, this.category);
    }));
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
      await this.categoryService.deleteCategory(this.checkbookCache, this.category);
    }
  }

  openAddTransactionDialog() {
    if (this.checkbook) {
      this.dialog.open(TransactionCreateComponent, {
        data: {checkbook: this.checkbook, category: this.category},
      });
    }
  }
}
