import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { user } from '../auth/login-form/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  allUsers: user[];
  private currentUser: user;
  // public isLoggedIn = localStorage.getItem('loggedIn') || false;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  subject = new BehaviorSubject(123);

  constructor(private http: HttpClient) {}

  setIsLoggedIn(user: user) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userId', user.id.toString());
    this.isLoggedIn.next(true);
  }

  getIsLoggedIn() {
    const isLoggedin = localStorage.getItem('loggedIn');
    console.log('is logged in from auth service', isLoggedin);
    if (isLoggedin) {
      this.isLoggedIn.next(true);
      return this.isLoggedIn$;
    }
    this.isLoggedIn.next(false);
    return this.isLoggedIn$;
  }

  getUserDetails(userId: number) {
    // const userId = localStorage.getItem('userId');
    console.log('userId from get user details', userId);
    if (this.currentUser) {
      console.log('current user from auth', this.currentUser);
      return this.currentUser;
    }

    const res = this.http.get<user[]>(
      `https://jsonplaceholder.typicode.com/users`,
      {
        params: {
          id: userId,
        },
        observe: 'response',
      }
    );
    const httpRes = firstValueFrom(res);
    httpRes.then((res) => {
      if (res.body && res.body.length === 1) {
        this.currentUser = res.body[0];
        return this.setIsLoggedIn(res.body[0]);
      }
      return {
        success: false,
        message: 'Something went wrong, please re-login',
      };
    });
    return;
  }

  userLogin(email: string) {
    const res = this.http.get<user[]>(
      `https://jsonplaceholder.typicode.com/users`,
      {
        params: {
          email,
        },
        observe: 'response',
      }
    );
    const user = firstValueFrom(res);
    user.then((res) => {
      if (res.body) {
        this.currentUser = res.body[0];
        return this.setIsLoggedIn(res.body[0]);
      }
      return false;
    });

    return user;
  }
}
