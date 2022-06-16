import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Checkbook} from "../../../../models/checkbook";
import {CheckbookService} from "../../../../services/checkbook.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-checkbook-edit',
  templateUrl: './checkbook-edit.component.html',
  styleUrls: ['./checkbook-edit.component.scss']
})
export class CheckbookEditComponent {
  editPageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CheckbookEditComponent>,
    @Inject(MAT_DIALOG_DATA) public checkBookData: Checkbook,
    private checkbooksService: CheckbookService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.editPageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.editPageForm.patchValue(this.checkBookData);
  }

  async save() {
    if (!this.editPageForm.valid) return;

    if (this.checkBookData.ownerId !== this.authService.currentUser?.uid) return;

    const change = {
      name: this.editPageForm.value.name,
      description: this.editPageForm.value.description
    }

    await this.checkbooksService.updateCheckbook(this.checkBookData.id, change)
    this.dialogRef.close();
  }

}
