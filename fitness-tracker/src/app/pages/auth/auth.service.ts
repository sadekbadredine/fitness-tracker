import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();
  private user!: User | null;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = new User(
      authData.email,
      Math.round(Math.random() * 1000).toString()
    );
    this.handleAuthentication();
  }

  login(authData: AuthData) {
    this.user = new User(
      authData.email,
      Math.round(Math.random() * 1000).toString()
    );
    this.handleAuthentication();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    // we can return this.user, and since it's an object therefore a reference type
    // other parts of the app could now that object, and then change the object in the service (at line 7)
    // to prevent this, we return a new objcet using the object spread operator  { ...Object }
    // to spread the properties of the user object stored in the service in to this new object
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
    //   this != check for value equality, will return true if the user is not equal to null
    // and if it is equal to null, will return false
  }

  private handleAuthentication() {
    this.authChange.next(true);
    this.router.navigate(['training']);
  }
}
