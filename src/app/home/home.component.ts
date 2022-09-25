import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../auth/login-form/login';
import { AuthService } from '../service/auth.service';
import { TodosService } from '../service/todos.service';
import { Todo } from '../todo-list/todos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;
  userDetails: user;
  userTodos: Todo[];
  userCompletedTodos: Todo[];
  userWaitingTodos: Todo[];

  constructor(
    public authService: AuthService,
    public todoService: TodosService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((res) => {
      this.isLoggedIn = res;
      if (res) {
        const userId = localStorage.getItem('userId');
        this.todoService
          .getTodosByUserId(parseInt(userId!))
          .subscribe((todos) => {
            if (todos) {
              this.userTodos = todos;
              this.userCompletedTodos = todos.filter(
                (todo) => todo.completed === true
              );
              this.userWaitingTodos = todos.filter(
                (todo) => todo.completed === false
              );
            }
          });
      }
    });
    this.userDetails = this.authService.getUserDetails();
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }
}
