import {Component, OnInit} from '@angular/core';
import {Checkbook} from "../../../models/checkbook";
import {CheckbookService} from "../../../services/checkbook.service";
import {where} from "@angular/fire/firestore";

@Component({
  selector: 'app-checkbook-archived',
  templateUrl: './checkbook-archived.component.html',
  styleUrls: ['./checkbook-archived.component.scss']
})
export class CheckbookArchivedComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];

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
