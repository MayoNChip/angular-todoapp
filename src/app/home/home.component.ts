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
  widgets: {
    title: string;
    dataSource: number;
    banner: string;
    type: string;
  }[];
  interests: string[];

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
              this.widgets = [
                {
                  title: `Total To-do's`,
                  dataSource: this.userTodos.length,
                  banner: 'Progress is key for success!',
                  type: 'total',
                },
                {
                  title: `Waiting To-do's`,
                  dataSource: this.userWaitingTodos.length,
                  banner: 'Keep it up!!',
                  type: 'waiting',
                },
                {
                  title: `Completed To-do's`,
                  dataSource: this.userCompletedTodos.length,
                  banner: 'Wow! Impressive!',
                  type: 'completed',
                },
              ];
              this.interests = [
                'workout',
                'studying',
                'Errands',
                'Personal development',
                'Vacation planning',
                'Financial planning',
                'Cooking',
                'Project management',
                'Career development',
                'Job search',
                'Coding',
              ];
            }
          });
      }
    });

    this.userDetails = this.authService.getUserDetails();
    console.log(this.userTodos);
  }
}
