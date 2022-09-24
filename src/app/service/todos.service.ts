import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../todo-list/todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService implements OnInit {
  constructor(public http: HttpClient) {}

  private userTodosListener: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  public userTodosListener$: Observable<Todo[]> =
    this.userTodosListener.asObservable();
  userTodos: Todo[];

  // public updatedUserTodos: BehaviorSubject<Todo[]> = new BehaviorSubject<
  //   Todo[]
  // >([]);
  // public updatedUserTodos$: Observable<Todo[]> | Todo[] =
  //   this.updatedUserTodos.asObservable();
  // userTodosWithUpdates: Todo[];
  isMutated: boolean = false;

  ngOnInit() {}

  // getLastTodoId():Todo[] {
  //   return this.user
  // }

  getTodos() {
    return this.userTodos;
  }

  getTodosByUserId(userId: number): Observable<Todo[]> {
    // if (this.isMutated) {
    //   return this.updatedUserTodos$;
    // }
    // this.updatedUserTodos.subscribe((res) => {
    //   if (res.length > 0) {
    //     return (this.userTodosWithUpdates = res);
    //   }
    //   return;
    // });

    // if (!this.userTodosWithUpdates) {
    //   console.log('updated array');
    //   return this.updatedUserTodos$;
    // }
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
    // localStorage.setItem('userTodos', JSON.stringify(this.userTodos));
    // return this.userTodos;
    // this.userTodosListener.next(this.userTodos);

    return this.userTodosListener$;
  }

  getTodoById(todoId: number) {
    if (this.userTodos) {
      console.log('userTodos from get todo details', this.userTodos);
      const filteredTodo = this.userTodos.filter((todo) => {
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
    // const TodoToUpdate = this.userTodosListener.getValue().filter((todo: Todo) => {
    //   return todo.id === todoId;
    // });
    const todos = this.userTodosListener.getValue();
    const indexOfTodo = todos.findIndex((todo) => todo.id === todoId);
    todos[indexOfTodo].completed = status;
    this.userTodosListener.next(todos);
    // this.userTodos[indexOfTodo].completed = status;
    // if (this.isMutated) {
    //   this.updatedUserTodos.next(this.userTodos);
    // }
    // this.userTodosListener.next(this.userTodos);
  }

  addNewTodo(newTodo: Todo) {
    if (typeof newTodo.userId === 'string') {
      newTodo.userId = parseInt(newTodo.userId);
    }
    const newTodos = this.userTodosListener.getValue();
    newTodos.splice(0, 0, newTodo);
    // const newTodos = this.userTodosListener.getValue().splice(0, 0, newTodo);
    // this.userTodos.splice(0, 0, newTodo);
    // const newTodos = [...this.userTodos, newTodo];
    console.log('todos before add', this.userTodos);
    // this.userTodos = newTodos;
    // this.updatedUserTodos.next(this.userTodos);
    this.userTodosListener.next(newTodos);
    // this.isMutated = true;
  }

  resetTodos() {
    this.userTodosListener.next([]);
    // this.userTodosListener.unsubscribe();
  }
}
