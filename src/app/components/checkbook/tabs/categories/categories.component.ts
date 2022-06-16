import {Component, Input, OnInit} from '@angular/core';
import {Checkbook} from "../../../../models/checkbook";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input()
  public checkbook: Checkbook = {} as Checkbook;

  constructor() { }

  ngOnInit(): void {
  }

}
