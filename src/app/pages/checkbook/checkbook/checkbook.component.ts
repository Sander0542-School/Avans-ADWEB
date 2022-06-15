import {Component, OnInit} from '@angular/core';
import {CheckbookService} from "../../../services/checkbook.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Checkbook} from "../../../models/checkbook";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {

  private checkbookId$: Observable<string> | undefined;
  public checkbook: Checkbook;

  constructor(
    private route: ActivatedRoute,
    private checkbooksService: CheckbookService
  ) {
    this.checkbook = {} as Checkbook;
  }

  ngOnInit(): void {
    this.checkbookId$ = new Observable<string>(observer => {
      this.route.params.subscribe(params => {
        observer.next(params['id']);
      });
    });
    this.checkbookId$.subscribe(async checkbookId => {
      const checkbook = await this.checkbooksService.getCheckbook(checkbookId);
      checkbook.subscribe(document => {
        this.checkbook = document.data() as Checkbook;
        this.checkbook.id = document.id;
      });
    });
  }

}
