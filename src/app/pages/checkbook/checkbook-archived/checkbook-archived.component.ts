import {Component, OnInit} from '@angular/core';
import {Checkbook} from "../../../models/checkbook";
import {CheckbookService} from "../../../services/checkbook.service";
import {where} from "@angular/fire/firestore";
import {TableAction} from "../../../components/checkbook/checkbook-table/checkbook-table.component";

@Component({
  selector: 'app-checkbook-archived',
  templateUrl: './checkbook-archived.component.html',
  styleUrls: ['./checkbook-archived.component.scss']
})
export class CheckbookArchivedComponent implements OnInit {
  tableActions: TableAction[] = [
    {
      name: 'Restore',
      action: (checkbook: Checkbook) => this.restoreCheckbook(checkbook.id)
    }
  ];

  private documents: Checkbook[] = [];

  constructor(
    private checkbooksService: CheckbookService
  ) {
  }

  ngOnInit(): void {
    this.checkbooksService.getCheckbooks(snapshot => {
      this.documents = snapshot.docs.map(doc => {
        const checkbook = doc.data() as Checkbook;
        checkbook.id = doc.id;
        return checkbook
      });
    }, where('archived', '==', true));
  }

  get checkbooks() {
    return this.documents;
  }

  async restoreCheckbook(checkbookId: string) {
    await this.checkbooksService.updateCheckbook(checkbookId, {archived: false});
  }
}
