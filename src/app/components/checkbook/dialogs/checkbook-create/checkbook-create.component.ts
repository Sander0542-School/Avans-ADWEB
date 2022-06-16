import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Checkbook} from "../../../../models/checkbook";
import {CheckbookService} from "../../../../services/checkbook.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-checkbook-create',
  templateUrl: './checkbook-create.component.html',
  styleUrls: ['./checkbook-create.component.scss']
})
export class CheckbookCreateComponent implements OnInit {
  editPageForm: FormGroup;
  pending: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CheckbookCreateComponent>,
    private checkbooksService: CheckbookService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.editPageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pending = false;
  }


  async save() {
    if (!this.editPageForm.valid) return;

    const checkbook = {
      ownerId: this.authService.currentUser?.uid,
      name: this.editPageForm.value.name,
      description: this.editPageForm.value.description,
      users: [this.authService.currentUser?.uid],
      archived: false,
    } as Checkbook;

    await this.checkbooksService.addCheckbook(checkbook);
    this.dialogRef.close();
  }

}
