import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../models/transaction";
import {empty, Observable, switchMap} from "rxjs";
import {Checkbook} from "../../../../models/checkbook";
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {TransactionService} from "../../../../services/transaction.service";
import {CategoryDialogComponent} from "../../categories/dialogs/category-dialog/category-dialog.component";
import {TransactionEditComponent} from "../dialogs/transaction-edit/transaction-edit.component";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  public readonly displayedColumns: string[] = ['date', 'value'];

  @Input()
  public checkbook!: Checkbook;
  @Input()
  public category!: Category;

  @Input()
  public transactions!: Observable<Transaction[]>;

  @Input()
  public actions: TableAction[] = [];

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {

  }

  editTransaction(transaction: Transaction) {
    this.dialog.open(TransactionEditComponent, {
      data: {
        transaction: transaction,
        category: this.category,
        checkbook: this.checkbook
      },
    });
  }

  async deleteTransaction(transaction: Transaction) {
    await this.transactionService.deleteTransaction(this.checkbook, this.category, transaction);
  }
}


export type TableAction = {
  name: string,
  action: (transaction: Transaction) => void
}
