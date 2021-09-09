import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user!: User | null;

  registerUser(authData: AuthData) {
    this.user = new User(
      authData.email,
      Math.round(Math.random() * 1000).toString()
    );
  }

  login(authData: AuthData) {
    this.user = new User(
      authData.email,
      Math.round(Math.random() * 1000).toString()
    );
  }

  logout() {
    this.user = null;
  }

  getUser() {
    // we can return this.user, and since it's an object therefore a reference type
    // other parts of the app could now that object, and then change the object in the service (at line 7)
    // to prevent this, we return a new objcet using the object spread operator  { ...Object }
    // to spread the properties of the user object stored in the service in to this new object
    return { ...this.user };
  }

  isAuth() {
    this.user != null;
    //   this != check for value equality, will return true if the user is not equal to null
    // and if it is equal to null, will return false
  }
}
