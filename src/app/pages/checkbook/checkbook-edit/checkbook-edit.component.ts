import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Checkbook} from "../../../models/checkbook";
import {CheckbookService} from "../../../services/checkbook.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-checkbook-edit',
  templateUrl: './checkbook-edit.component.html',
  styleUrls: ['./checkbook-edit.component.scss']
})
export class CheckbookEditComponent {
  editPageForm: FormGroup;
  pending: boolean = true;

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

  save(): void {
    if (!this.editPageForm.valid) return;

    this.checkBookData.name = this.editPageForm.value.name;
    this.checkBookData.description = this.editPageForm.value.description;

    if (this.checkBookData.ownerId !== this.authService.currentUser?.uid) return;
    this.checkbooksService.updateCheckbook(this.checkBookData.id, this.checkBookData).then(r => this.dialogRef.close());
  }

}
