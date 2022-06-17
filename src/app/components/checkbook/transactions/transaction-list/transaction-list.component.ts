import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../models/transaction";
import {empty, Observable, switchMap} from "rxjs";
import {Checkbook} from "../../../../models/checkbook";
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {TransactionService} from "../../../../services/transaction.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  public readonly displayedColumns: string[] = ['date', 'value'];

  @Input()
  public transactions!: Observable<Transaction[]>;

  @Input()
  public actions: TableAction[] = [];

  constructor(
  ) {
  }

  ngOnInit(): void {

  }
}


export type TableAction = {
  name: string,
  action: (transaction: Transaction) => void
}
