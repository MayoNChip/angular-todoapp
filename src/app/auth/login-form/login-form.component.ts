import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TodosService } from 'src/app/service/todos.service';
import { user } from './login';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public authService: AuthService,
    private router: Router,
    public todoService: TodosService,
    public genToast: MatSnackBar
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

    this.authService.userLogin(userData.email).then((response) => {
      if (!response.ok) {
        this.errorMsg = 'Something went wrong';
        return;
      }
      if (response.body && response.body.length < 1) {
        console.log('Error no such user');
        this.genToast.open('User with this email does not exists', 'Dismiss', {
          duration: 3000,
          panelClass: 'failure-toast',
        });
        this.errorMsg = 'User with this email does not exists';
        return;
      }
      if (response.body) {
        console.log(response.body);
        this.userLoginResponse = response.body[0];
        const userId = this.authService.setIsLoggedIn(response.body[0]);
        console.log('success');

        //TODO: look at adding a toast

        this.genToast.open('Succesfully Logged In', 'Dismiss', {
          duration: 2000,
          panelClass: 'success-toast',
        });
        this.router.navigate(['/home']);
        return;
      }
    });
    return;
  }
}
