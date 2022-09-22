import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { user } from './login';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  successMsg: string;
  errorMsg: string;
  userLoginResponse: user;
  isLoading: boolean;

  constructor(
    public fb: FormBuilder,
    public fireStoreService: FirebaseService,
    public authService: AuthService,
    private router: Router,
    private http: HttpClient,
    public appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.valueChanges.subscribe(console.log);
  }

  ngOnDestroy(): void {}

  get email() {
    const email = this.loginForm.get('email');
    return email;
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmit(userData: { email: string; password: string }) {
    if (!userData.email) {
      console.log('error');
      return (this.errorMsg = 'Please enter all required fields');
    }
    this.errorMsg = '';
    //     if (valid.length < 1) {
    //       return (this.errorMsg = 'User with this username does not exists');
    //     }
    //     return this.router.navigate(['/todos']);

    this.authService.userLogin(userData.email).then((response) => {
      if (!response.ok) {
        this.errorMsg = 'Something went wrong';
        return;
      }
      if (response.body && response.body.length < 1) {
        console.log('Error no such user');
        this.errorMsg = 'User with this email does not exists';
        return;
      }
      if (response.body) {
        console.log(response.body);
        this.userLoginResponse = response.body[0];
        this.authService.setIsLoggedIn(response.body[0]);
        console.log('success');
        //TODO: look at adding a toast
        this.successMsg = 'Successcully logged in!';
        this.appRef.tick();
        this.router.navigate(['/todos']);
        return;
      }
    });
    console.log('dont know what that means');
    return;
  }
}
