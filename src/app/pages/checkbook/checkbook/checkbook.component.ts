import {Component, OnInit} from '@angular/core';
import {CheckbookService} from "../../../services/checkbook.service";
import {ActivatedRoute} from "@angular/router";
import {Checkbook} from "../../../models/checkbook";
import {Transaction} from "../../../models/transaction";
import {orderBy, Unsubscribe, where} from "@angular/fire/firestore";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {

  public checkbook: Checkbook = {} as Checkbook;
  public transactions: Transaction[] = [];

  public month!: Date;

  private transactionUnsubscribe: Unsubscribe | undefined;

  constructor(
    private route: ActivatedRoute,
    private checkbooksService: CheckbookService
  ) {
    this.currentMonth();
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const checkbookId = params['id'];

      const checkbook = await this.checkbooksService.getCheckbook(checkbookId);
      checkbook.subscribe(document => {
        const checkbook = document.data() as Checkbook;
        checkbook.id = document.id;

        this.checkbook = checkbook;
        this.updateTransactions();
      });
    });
  }

  private updateTransactions() {
    if (!this.checkbook.id) return;

    this.transactionUnsubscribe?.();
    this.transactionUnsubscribe = this.checkbooksService.getTransactions(this.checkbook.id, snapshot => {
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
}
