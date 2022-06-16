import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../../../../../services/transaction.service";

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent {
  editPageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TransactionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
  ) {
    this.editPageForm = this.formBuilder.group({
      value: ['', Validators.required],

    });
    this.editPageForm.patchValue(this.data.transaction);
  }

  async save() {
    if (!this.editPageForm.valid) return;

    const change = {
      value: this.editPageForm.value.value,
    }

    await this.transactionService.updateTransaction(this.data.checkbook, this.data.transaction.id, change)
    this.dialogRef.close();
  }

}
