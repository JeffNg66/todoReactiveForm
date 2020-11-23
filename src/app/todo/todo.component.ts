import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';

// import { TodoformService } from '../shared/todoform.service';
interface TODO {
    // $key: string;
    task: string;
    priority: string;
    dueDate: Date;
    complete: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  form: FormGroup;
  toDoList: TODO[]
  isEditMode: boolean = false;
  priorityList: string[] = ['Low', 'Medium', 'High'];
  today = new Date();
  editID: number;
  editStatus: boolean = false;

  constructor( public fb: FormBuilder ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // $key: new FormControl(null),
      task: this.fb.control('', Validators.required),
      priority: this.fb.control('', Validators.required),
      dueDate: this.fb.control('', Validators.required),
      // complete: this.fb.control(false),
    })

    this.setToDoList();
    console.log(this.toDoList);
  }

  onSubmit(formDirective: FormGroupDirective) {
    // console.log(formDirective);
    // console.log(this.form.value);
    let { task, priority, dueDate } = this.form.value;
    let newTodo = { task, priority, dueDate, complete: false };
    
    if (this.editStatus === true) {
      this.edit(this.editID, newTodo);
      formDirective.resetForm();
      this.form.reset();
      return;
    }
    
    let todo = this.getLSItem();
    if (todo) {
      todo.push(newTodo);
      this.setToDoToLS(todo);
    } else {
      this.setToDoToLS([newTodo]);
    }
    this.setToDoList();
    formDirective.resetForm();
    // this.form.reset();
    // console.log(this.form.value);
    // this.notification('New Todo Added', 'dismiss');
    return;
  }

  getLSItem() {
    return JSON.parse(localStorage.getItem('todo'))
  }

  setToDoList() {
    this.toDoList = this.getLSItem();
  }
  
  setToDoToLS(todo: TODO[]) {
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  clearLS() {
    // delete completed tasks only by retrieving tasks that are not complete
    // localStorage.clear();
    let todo = this.getLSItem();
    let t = todo.filter(a => !a.complete)
    this.setToDoToLS(t);
    this.setToDoList();
    // this.notification('All ToDo Removed', 'dismiss');
  }
  
  deleteSingleToDo(i: number) {
    // delete only if not in editing mode
    // if (this.editStatus === false) {
    if (!this.editStatus) {
      let todo = this.getLSItem();
      todo.splice(i, 1);
      this.setToDoToLS(todo);
      this.setToDoList();
      // this.notification(`${todo[i].desc} deleted`, 'dismiss');
    }
  }

  completeSingleToDo(i: number) {
    let todo = this.getLSItem();
    todo[i].complete = !todo[i].complete;
    this.setToDoToLS(todo);
    this.setToDoList();
    // let text = todo[i].complete ? 'completed!' : `due on ${todo[i].due}`;
    // this.notification(`${todo[i].desc} ${text}`, 'dismiss');
  }

  editToDo(i: number) {
    this.editID = i;
    this.editStatus = true;
    let todos = this.getLSItem();
    let itemToEdit = todos[i];
    this.form.patchValue(itemToEdit);
    // console.log('Editing get from LS: ', todos)
    // console.log('Editing itemtoEdit: ', itemToEdit)
  }

  edit(id: number, todo: TODO) {
    let todos = this.getLSItem();
    todos[id] = todo;
    // console.log('take from local storage:  ', todos)
    // console.log('todos[id]:  ', todo)

    this.setToDoToLS(todos);
    this.setToDoList();
    // this.notification('edit success', 'dismiss');
    //Clear status
    this.clearEditToDo();
  }

  clearEditToDo(formDirective?: FormGroupDirective) {
    this.editStatus = false;
    if (formDirective) {
      formDirective.resetForm();
    }

    this.form.reset();
  }

  // onClear() {
  //   this.editStatus = false;
  //   this.form.reset();
  // }
}
