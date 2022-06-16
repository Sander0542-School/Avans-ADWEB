import {Component, Input} from '@angular/core';
import {Checkbook} from "../../../models/checkbook";
import {Observable} from "rxjs";

@Component({
  selector: 'app-checkbook-table',
  templateUrl: './checkbook-table.component.html',
  styleUrls: ['./checkbook-table.component.scss']
})
export class CheckbookTableComponent {

  public readonly columns: string[] = ['name', 'description', 'actions'];

  @Input()
  public checkbooks!: Observable<Checkbook[]>;

  @Input()
  public actions: TableAction[] = [];

  constructor() {
  }

}

export type TableAction = {
  name: string,
  action: (checkbook: Checkbook) => void,
  disabled?: (checkbook: Checkbook) => boolean
}
