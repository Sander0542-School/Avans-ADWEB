import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Checkbook} from "../../../models/checkbook";
import {CheckbookService} from "../../../services/checkbook.service";
import {MatDialog} from '@angular/material/dialog';
import {CheckbookCreateComponent} from "../checkbook-create/checkbook-create.component";
import {where} from "@angular/fire/firestore";

@Component({
  selector: 'app-checkbook-list',
  templateUrl: './checkbook-list.component.html',
  styleUrls: ['./checkbook-list.component.scss']
})
export class CheckbookListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];

  private documents: Checkbook[] = [];

  @ViewChild('modalContent')
  modalContent: ElementRef | undefined;

  constructor(
    public dialog: MatDialog,
    private checkbooksService: CheckbookService,
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

  open() {
    this.dialog.open(CheckbookCreateComponent);
  }

  async archiveCheckbook(checkbookId: string) {
    await this.checkbooksService.updateCheckbook(checkbookId, {archived: true});
  }
}
