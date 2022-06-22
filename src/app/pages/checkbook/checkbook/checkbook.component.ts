import {Component, OnInit} from '@angular/core';
import {CheckbookService} from "../../../services/checkbook.service";
import {ActivatedRoute} from "@angular/router";
import {Checkbook} from "../../../models/checkbook";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, catchError, Observable, of, ReplaySubject, switchMap} from "rxjs";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {

  private rawCheckbook!: Observable<Checkbook | null>;
  public checkbook!: ReplaySubject<Checkbook>;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private checkbooksService: CheckbookService
  ) {
    this.checkbook = new ReplaySubject<Checkbook>();
  }

  async ngOnInit() {
    this.rawCheckbook = this.route.params.pipe(switchMap(value => this.checkbooksService.getCheckbook(value['id'])), catchError(() => {
      return of(null);
    }));
    this.rawCheckbook.subscribe(value => value ? this.checkbook.next(value) : null);
  }
}
