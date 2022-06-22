import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../../models/transaction";
import {orderBy, where} from "@angular/fire/firestore";
import {Checkbook} from "../../../../models/checkbook";
import {TransactionService} from "../../../../services/transaction.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Input()
  public checkbook!: Observable<Checkbook>;
  public categories!: Observable<Category[]>
  public transactions!: Observable<Transaction[]>;

  public month: BehaviorSubject<Date>;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {
    this.month = new BehaviorSubject(this.currentMonthStart);
  }

  ngOnInit(): void {
    this.categories = this.checkbook.pipe(switchMap(checkbook => this.categoryService.getCategories(checkbook)))
    this.transactions = combineLatest([this.checkbook, this.month]).pipe(
      switchMap(([checkbook, date]) => this.transactionService.getTransactionsWithCategory(
        checkbook,
        where('datetime', '>=', date),
        where('datetime', '<', new Date(date.getFullYear(), date.getMonth() + 1, 1)),
        orderBy('datetime', 'desc')
      ))
    )
  }

  nextMonth() {
    this.month.next(new Date(this.month.value.getFullYear(), this.month.value.getMonth() + 1, 1));
  }

  prevMonth() {
    this.month.next(new Date(this.month.value.getFullYear(), this.month.value.getMonth() - 1, 1));
  }

  currentMonth() {
    this.month.next(this.currentMonthStart);
  }

  get currentMonthStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
}
