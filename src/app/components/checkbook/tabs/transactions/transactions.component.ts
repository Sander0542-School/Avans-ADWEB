import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableAction} from "../../transactions/transaction-list/transaction-list.component";
import {Transaction} from "../../../../models/transaction";
import {orderBy, Unsubscribe, where} from "@angular/fire/firestore";
import {Checkbook} from "../../../../models/checkbook";
import {TransactionService} from "../../../../services/transaction.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {TransactionCreateComponent} from "../../transactions/dialogs/transaction-create/transaction-create.component";
import {TransactionEditComponent} from "../../transactions/dialogs/transaction-edit/transaction-edit.component";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnChanges {

  @Input()
  public checkbook: Checkbook = {} as Checkbook;

  public transactions: Transaction[] = [];

  private transactionUnsubscribe: Unsubscribe | undefined;

  public listActions: TableAction[] = [
    {
      name: 'Edit',
      action: (transaction: Transaction) => this.openEditTransactionDialog(this.checkbook, transaction),
    },
    {
      name: 'Delete',
      action: (transaction: Transaction) => this.deleteTransaction(this.checkbook, transaction),
    }
  ]

  public month!: Date;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    this.currentMonth();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkbook']) {
      this.updateTransactions();
    }
  }

  private updateTransactions() {
    if (!this.checkbook.id) return;

    this.transactionUnsubscribe?.();
    this.transactionUnsubscribe = this.transactionService.getTransactions(this.checkbook, snapshot => {
        this.transactions = snapshot.docs.map(doc => {
          const transaction = doc.data() as Transaction;
          transaction.id = doc.id;
          return transaction
        });
      },
      where('datetime', '>=', this.month),
      where('datetime', '<', new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1)),
      orderBy('datetime', 'desc')
    );
  }

  nextMonth() {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
    this.updateTransactions();
  }

  prevMonth() {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
    this.updateTransactions();
  }

  currentMonth() {
    const now = new Date();
    this.month = new Date(now.getFullYear(), now.getMonth(), 1);
    this.updateTransactions();
  }

  openAddTransactionDialog(checkbook: Checkbook) {
    this.dialog.open(TransactionCreateComponent, {
      data: checkbook,
    });
  }

  openEditTransactionDialog(checkbook: Checkbook, transaction: Transaction) {
    this.dialog.open(TransactionEditComponent, {
      data: {transaction: transaction, checkbook: checkbook},

    });
  }

  async deleteTransaction(checkbook: Checkbook, transaction: Transaction) {
    // await this.transactionService.deleteTransaction(checkbook, transaction);
  }

}
