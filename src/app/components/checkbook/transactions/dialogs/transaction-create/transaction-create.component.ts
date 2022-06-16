import {Component, Inject, OnInit} from '@angular/core';
import {Checkbook} from "../../../../../models/checkbook";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Transaction} from "../../../../../models/transaction";
import {TransactionService} from "../../../../../services/transaction.service";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit {

  editPageForm: FormGroup;
  pending: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<TransactionCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public checkBookData: Checkbook,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
  ) {
    this.editPageForm = this.formBuilder.group({
      value: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pending = false;
  }

  async save() {
    if (!this.editPageForm.valid) return;

    const transaction = {
      value: this.editPageForm.value.value,
      datetime: Timestamp.now(),
    } as Transaction;

    // await this.transactionService.addTransaction(this.checkBookData, transaction);
    this.dialogRef.close();
  }

}
