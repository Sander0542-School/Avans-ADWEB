import {Injectable} from '@angular/core';
import {Auth, AuthProvider, authState, GoogleAuthProvider, signInWithPopup, signOut} from "@angular/fire/auth";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: Auth,
    private userService: UserService
  ) {
    this.authState.pipe().subscribe(async user => {
      if (user == null) return;
      await this.userService.updateUser(user);
    });
  }

  get currentUser() {
    return this.afAuth.currentUser;
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
