import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  readonly isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  readonly user$ = this.authService.authState;

  @ViewChild('loginEmail')
  private loginEmail!: ElementRef;

  @ViewChild('loginPassword')
  private loginPassword!: ElementRef;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
  }

  async login() {
    await this.authService.login();
  }

  async loginEmailPassword() {
    await this.authService.loginEmailPassword(this.loginEmail.nativeElement.value, this.loginPassword.nativeElement.value);
  }

  async logout() {
    await this.authService.logout();
  }

}
