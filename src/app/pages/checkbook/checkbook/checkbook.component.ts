import {Component, OnInit} from '@angular/core';
import {CheckbookService} from "../../../services/checkbook.service";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.scss']
})
export class CheckbookComponent implements OnInit {

  constructor(
    private checkbooksService: CheckbookService
  ) {
  }

  ngOnInit(): void {
  }

}
