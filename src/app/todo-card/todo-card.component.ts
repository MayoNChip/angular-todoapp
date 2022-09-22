import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../service/todos.service';
import { Todo } from '../todo-list/todos';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
})
export class TodoCardComponent implements OnInit {
  todoId: string;
  @Input() todoDetails: Todo;
  constructor(
    public router: ActivatedRoute,
    public todoService: TodosService
  ) {}

  ngOnInit(): void {
    console.log(this.router.snapshot.paramMap.get('todoId'));
    const todoId = this.router.snapshot.paramMap.get('todoId');
    if (!todoId) {
      return;
    }
    this.todoId = todoId;
    const res = this.todoService.getTodoById(parseInt(todoId));
    console.log('Todo details', res);
    if (res) {
      this.todoDetails = res;
    }
    this.getTodo();
  }

  getTodo() {
    console.log('todo id from state', this.todoDetails);
  }
}
