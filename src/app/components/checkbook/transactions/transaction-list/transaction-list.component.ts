import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../models/transaction";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  public readonly displayedColumns: string[] = ['date', 'value', 'actions'];

  @Input()
  public transactions: Transaction[] = [];

  @Input()
  public actions: TableAction[] = [];

  constructor() {
  }
}


export type TableAction = {
  name: string,
  action: (transaction: Transaction) => void
}
