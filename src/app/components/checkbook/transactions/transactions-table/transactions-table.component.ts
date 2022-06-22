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
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent {

  public readonly displayedColumns: string[] = ['date', 'value'];

  @Input()
  public checkbook!: Checkbook | null;

  @Input()
  public category!: Category;

  @Input()
  public transactions!: Observable<Transaction[]>;

  @Input()
  public actions: TableAction[] = [];

  constructor() {
  }

}

export type TableAction = {
  name: string,
  action: (transaction: Transaction) => void
}
