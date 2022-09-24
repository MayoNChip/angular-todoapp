import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../todo-list/todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(public http: HttpClient) {}

  private userTodosListener: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  public userTodosListener$: Observable<Todo[]> =
    this.userTodosListener.asObservable();

  public onlyCompletedTodos: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  public onlyCompletedTodos$: Observable<Todo[]> =
    this.onlyCompletedTodos.asObservable();

  todosNoFilter: Todo[];

  getTodosByUserId(userId: number): Observable<Todo[]> {
    if (this.userTodosListener.getValue()[0]) {
      return this.userTodosListener$;
    }

    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: {
          userId,
        },
      })
      .subscribe((res) => {
        this.userTodosListener.next(res);
      });
    return this.userTodosListener$;
  }

  getTodoById(todoId: number) {
    if (this.userTodosListener) {
      console.log(
        'userTodos from get todo details',
        this.userTodosListener.getValue()
      );
      const filteredTodo = this.userTodosListener.getValue().filter((todo) => {
        return todoId === todo.id;
      });
      if (filteredTodo.length !== 1) {
        console.log('no todo on this id');
        return;
      }
      const finalTodo = filteredTodo[0];
      return finalTodo;
    }
    return;
  }

  updateStatusById(todoId: number, status: boolean, userId: number) {
    const todos = this.userTodosListener.getValue();
    const indexOfTodo = todos.findIndex((todo) => todo.id === todoId);
    todos[indexOfTodo].completed = status;
    todos[indexOfTodo].new = false;
    this.userTodosListener.next(todos);
  }

  addNewTodo(newTodo: Todo) {
    if (typeof newTodo.userId === 'string') {
      newTodo.userId = parseInt(newTodo.userId);
    }
    console.log('new todo id', newTodo.id);
    const newTodos = this.userTodosListener.getValue();
    newTodos.splice(0, 0, newTodo);
    this.userTodosListener.next(newTodos);
    return true;
  }

  resetTodos() {
    this.userTodosListener.next([]);
  }

  deleteDups(array: Todo[]) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  }

  toggleCompleted(newState: boolean) {
    const OnlyCompletedTodos = this.userTodosListener
      .getValue()
      .filter((todo) => todo.completed === !newState);
    if (newState) {
      this.todosNoFilter = this.userTodosListener.getValue();
      return this.userTodosListener.next(OnlyCompletedTodos);
    } else {
      var todos = this.deleteDups(
        this.todosNoFilter.concat(this.userTodosListener.getValue())
      );
      console.log('todos after concat', todos);
      this.userTodosListener.next(todos);
    }
  }
}
