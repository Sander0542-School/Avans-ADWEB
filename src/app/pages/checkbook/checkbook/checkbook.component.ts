import {Component, OnInit} from '@angular/core';
import {CheckbookService} from "../../../services/checkbook.service";
import {ActivatedRoute} from "@angular/router";
import {Checkbook} from "../../../models/checkbook";
import {MatDialog} from "@angular/material/dialog";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {

  public checkbook!: Observable<Checkbook>;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private checkbooksService: CheckbookService
  ) {
  }

  ngOnInit(): void {
    this.checkbook = this.route.params.pipe(switchMap(value => this.checkbooksService.getCheckbook(value['id'])));
  }
}
