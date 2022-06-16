import {Component, OnInit} from '@angular/core';
import {Checkbook} from "../../../models/checkbook";
import {CheckbookService} from "../../../services/checkbook.service";
import {where} from "@angular/fire/firestore";
import {TableAction} from "../../../components/checkbook/checkbook-table/checkbook-table.component";
import {Observable} from "rxjs";

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

  public checkbooks!: Observable<Checkbook[]>;

  constructor(
    private checkbooksService: CheckbookService
  ) {
  }

  ngOnInit(): void {
    this.checkbooks = this.checkbooksService.getCheckbooks(where('archived', '==', true));
  }

  async restoreCheckbook(checkbookId: string) {
    await this.checkbooksService.updateCheckbook(checkbookId, {archived: false});
  }
}
