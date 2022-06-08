import {Injectable} from '@angular/core';
import {Auth, AuthProvider, authState, GoogleAuthProvider, signInWithPopup, signOut} from "@angular/fire/auth";
import {skip} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: Auth
  ) {
    this.authState.pipe(skip(1)).subscribe(user => {
      if (user) {
        console.log('User logged in: ', user.uid);
      } else {
        console.log('User logged out');
      }
    });
  }

  get authState() {
    return authState(this.afAuth);
  }

  async login() {
    return await this.authLogin(new GoogleAuthProvider())
  }

  logout() {
    return signOut(this.afAuth);
  }

  private async authLogin(provider: AuthProvider) {
    return await signInWithPopup(this.afAuth, provider);
  }
}
