import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CheckbookService} from "../../../../services/checkbook.service";
import {Checkbook} from "../../../../models/checkbook";
import {Category} from "../../../../models/category";
import {AuthService} from "../../../../services/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-checkbook-dialog',
  templateUrl: './checkbook-dialog.component.html',
  styleUrls: ['./checkbook-dialog.component.scss']
})
export class CheckbookDialogComponent implements OnInit {

  public form: FormGroup

  public users!: Observable<User[]>

  get userId() {
    return this.authService.currentUser?.uid;
  }

  constructor(
    public dialogRef: MatDialogRef<CheckbookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private checkbookService: CheckbookService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      users: [[], Validators.required]
    })
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    if (this.data.checkbook) {
      this.form.patchValue({
        name: this.data.checkbook.name,
        description: this.data.checkbook.description,
        users: this.data.checkbook.users,
      })
    }
    this.form.value.users.push(this.authService.currentUser?.uid);
  }

  async save() {
    if (!this.form.valid) return;
    if (!this.authService.currentUser) return;

    const checkbook = {
      name: this.form.value.name,
      description: this.form.value.description,
      users: this.form.value.users,
    } as Checkbook;

    if (this.data.checkbook) {
      await this.checkbookService.updateCheckbook(this.data.checkbook, checkbook);
    } else {
      checkbook.ownerId = this.authService.currentUser.uid;
      checkbook.archived = false;

      await this.checkbookService.addCheckbook(checkbook);
    }

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

type Data = {
  checkbook?: Checkbook
}
