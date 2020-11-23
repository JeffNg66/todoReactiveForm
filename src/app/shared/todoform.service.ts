import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class TodoformService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    task: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    complete: new FormControl(false),
  });

  initializeForm() {
    this.form.setValue({
      $key: null,
      task: '',
      priority: '',
      dueDate: '',
      complete: '',
    })
  }

  getLSItem() {
    return JSON.parse(localStorage.getItem('todo'))
  }

  setToDoList() {
    // this.form = this.getLSItem();
  }
  
}
