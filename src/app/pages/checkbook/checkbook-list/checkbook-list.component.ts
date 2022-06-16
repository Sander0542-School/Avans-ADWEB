import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Checkbook} from "../../../models/checkbook";
import {CheckbookService} from "../../../services/checkbook.service";
import {MatDialog} from '@angular/material/dialog';
import {
  CheckbookCreateComponent
} from "../../../components/checkbook/dialogs/checkbook-create/checkbook-create.component";
import {where} from "@angular/fire/firestore";
import {CheckbookEditComponent} from "../../../components/checkbook/dialogs/checkbook-edit/checkbook-edit.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {TableAction} from "../../../components/checkbook/checkbook-table/checkbook-table.component";

@Component({
  selector: 'app-checkbook-list',
  templateUrl: './checkbook-list.component.html',
  styleUrls: ['./checkbook-list.component.scss']
})
export class CheckbookListComponent implements OnInit {
  tableActions: TableAction[] = [
    {
      name: 'View',
      action: (checkbook: Checkbook) => this.router.navigate(['/checkbooks', checkbook.id])
    },
    {
      name: 'Archive',
      action: (checkbook: Checkbook) => this.archiveCheckbook(checkbook.id)
    },
    {
      name: 'Edit',
      action: (checkbook: Checkbook) => this.openEditDialog(checkbook),
      disabled: (checkbook: Checkbook) => this.authService.currentUser?.uid !== checkbook.ownerId
    }
  ]

  private documents: Checkbook[] = [];

  @ViewChild('modalContent')
  modalContent: ElementRef | undefined;

  constructor(
    public dialog: MatDialog,
    private checkbooksService: CheckbookService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkbooksService.getCheckbooks(snapshot => {
      this.documents = snapshot.docs.map(doc => {
        const checkbook = doc.data() as Checkbook;
        checkbook.id = doc.id;
        return checkbook
      });
    }, where('archived', '==', false));
  }

  get checkbooks() {
    return this.documents;
  }

  openCreateDialog() {
    this.dialog.open(CheckbookCreateComponent);
  }

  openEditDialog(checkbook: Checkbook) {
    this.dialog.open(CheckbookEditComponent, {
      data: checkbook,
    });
  }

  async archiveCheckbook(checkbookId: string) {
    await this.checkbooksService.updateCheckbook(checkbookId, {archived: true});
  }
}
