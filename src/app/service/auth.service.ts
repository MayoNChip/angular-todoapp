import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { user } from '../auth/login-form/login';
import { Router } from '@angular/router';
import { TodosService } from './todos.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  allUsers: user[];
  public currentUser: user;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  subject = new BehaviorSubject(123);

  constructor(
    private http: HttpClient,
    public router: Router,
    public todoService: TodosService
  ) {}
  redirectUrl: string;

  setIsLoggedIn(user: user) {
    // localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userId', user.id.toString());
    this.isLoggedIn.next(true);
    return user.id;
  }

  getIsLoggedIn() {
    const userId = localStorage.getItem('userId');
    // console.log('is logged in from auth service', isLoggedin);
    if (userId) {
      this.isLoggedIn.next(true);
      return this.isLoggedIn$;
    }
    this.isLoggedIn.next(false);
    return this.isLoggedIn$;
  }

  getUserDetails() {
    if (this.currentUser) {
      return this.currentUser;
    }
    if (this.isLoggedIn.getValue()) {
      const userDetailsJson = localStorage.getItem('userDetails');
      return JSON.parse(userDetailsJson!);
    }
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
        localStorage.setItem('userDetails', JSON.stringify(res.body[0]));
        return this.setIsLoggedIn(res.body[0]);
      }
      return false;
    });

    return user;
  }

  userLogout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
    this.todoService.resetTodos();
    this.router.navigate(['/']);
  }
}
