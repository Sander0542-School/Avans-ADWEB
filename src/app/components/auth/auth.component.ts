import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  user: any = null;

  ngOnInit(): void {
  }

}
