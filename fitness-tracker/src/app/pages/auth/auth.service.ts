/* How does authentication work IMPORTANT TO READ
We got a server (Firebase => the Backend), and we got a client (Angular App => Frontend)
  - The client sends credentials to the server that validates them
  - The server sends response to the client that the credentials are validated
  ** In a traditional web app where we have non SPA, we would use a session to store the server response
  ** And on the client we would get a cookie
  In single page applications, the backend is stateless, it's a restful API
  Any backend you communicate with from an Angular app is stateless because you always send behind the sense
  Ajax HTTP requests as you got only one single page and you don't request new pages in between.  
  So we don't use a session with authentication, we use a JWT JSON Web Token.
  A token is a long string that encodes data about authentication status
  Then we should store the token on the Frontend (Browser Local Storage)
  The token is attached to the request from the Frontend whenever we wanna access protected resources
  Then the server validates if the token is and still a valid token (Not manipulated or expired)
*/
/* Cloud Firestore database rules
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.auth != null;
    }
  }
}
allow read, write means that we should allow read and write access if incoming request has an authentiated user
*/
import { TrainingService } from '../training/training.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListiner() {
    // authState observable emits an event whenever the auth status changes from
    // authenticated to unauthenticated
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // angularfire handle the token storage, and attaches it to ungoing request
    this.fireAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    );
  }

  login(authData: AuthData) {
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password);
  }

  logout() {
    this.fireAuth.signOut();
  }

  // getUser() {
  //   // we can return this.user, and since it's an object therefore a reference type
  //   // other parts of the app could now that object, and then change the object in the service (at line 7)
  //   // to prevent this, we return a new objcet using the object spread operator  { ...Object }
  //   // to spread the properties of the user object stored in the service in to this new object
  //   return { ...this.user };
  // }

  isAuth(): boolean {
    // return this.user != null;
    // //   this != check for value equality, will return true if the user is not equal to null
    // // and if it is equal to null, will return false
    return this.isAuthenticated;
  }
}
