import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../todo-list/todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(public http: HttpClient) {}
  userTodos: Todo[];
  todoRes: Todo;

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  getTodosByUserId(userId: number): Observable<Todo[]> {
    // const res = this.http.get<Todo[]>(
    //   'https://jsonplaceholder.typicode.com/todos',
    //   {
    //     params: {
    //       userId,
    //     },
    //     observe: 'response',
    //   }
    // );
    // const response = firstValueFrom(res);
    // response.then((res) => {
    //   if (res.body) {
    //     this.userTodos = res.body;
    //   }
    // });
    // console.log('res user todos from service', this.userTodos);
    // return this.userTodos;

    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params: {
        userId,
      },
    });
  }

  getTodoById(todoId: number) {
    //   const res = this.http.get<Todo>(
    //     'https://jsonplaceholder.typicode.com/todos',
    //     {
    //       params: {
    //         id: todoId,
    //       },
    //       observe: 'response',
    //     }
    //   );
    //   const response = firstValueFrom(res);
    //   response.then((res) => {
    //     if (res.body) {
    //       this.todoRes = res.body;
    //     }
    //   });
    //   console.log('res user todos from service', this.todoRes);
    //   return this.todoRes;
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
}
