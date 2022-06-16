import {Component, OnInit} from '@angular/core';
import {CheckbookService} from "../../../services/checkbook.service";
import {ActivatedRoute} from "@angular/router";
import {Checkbook} from "../../../models/checkbook";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {

  public checkbook: Checkbook = {} as Checkbook;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private checkbooksService: CheckbookService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const checkbookId = params['id'];

      const checkbook = await this.checkbooksService.getCheckbook(checkbookId);
      checkbook.subscribe(document => {
        const checkbook = document.data() as Checkbook;
        checkbook.id = document.id;

        this.checkbook = checkbook;
      });
    });
  }
}
