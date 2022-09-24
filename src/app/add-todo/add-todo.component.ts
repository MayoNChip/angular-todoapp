import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo-list/todos';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodosService } from '../service/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  addNewTodoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: number; userTodosLength: number },
    public fb: FormBuilder,
    public dialog: MatDialog,
    public todosService: TodosService,
    public toast: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addNewTodoForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  get title() {
    return this.addNewTodoForm.get('title');
  }

  get content() {
    return this.addNewTodoForm.get('content');
  }

  get dueDate() {
    return this.addNewTodoForm.get('dueDate');
  }

  handleAddTodo(value: { title: string; content: string }) {
    const newTodo = {
      userId: this.data.userId,
      id: this.data.userTodosLength + 1,
      title: value.title,
      content: value.content,
      completed: false,
      new: true,
    };
    const addTodoResponse = this.todosService.addNewTodo(newTodo);
    if (addTodoResponse) {
      this.toast.open('Successfully added To-do', 'Dismiss', {
        duration: 3000,
        panelClass: ['success-toast'],
        horizontalPosition: 'left',
      });
    }
    this.closeDialog();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
