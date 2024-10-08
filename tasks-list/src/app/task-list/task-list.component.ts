import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];
  public newTaskTitle: string = '';
  public newTaskDescription: string = '';
  public newTaskExpiryDate: string = ''; 

  ngOnInit() {
    this.loadTasksFromLocalStorage();
    this.checkExpiredTasks();
  }

  public addTask() {
    if(!this.newTaskTitle || !this.newTaskDescription) {
      alert('Please enter something!');
      return;
    }
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
        title: this.newTaskTitle,
        description: this.newTaskDescription,
        completed: false,
        expiryDate: this.newTaskExpiryDate ? new Date(this.newTaskExpiryDate) : undefined
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.newTaskExpiryDate = '';
      this.saveTasksToLocalStorage();
    }
  }

  public countCompletedTasks() {
    return this.tasks.filter(task => task.completed).length;
  }

  public deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasksToLocalStorage();
  }

  public saveTasksToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  public loadTasksFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const tasksFromStorage = localStorage.getItem('tasks');
      if (tasksFromStorage) {
        try {
          this.tasks = JSON.parse(tasksFromStorage);
        } catch (error) {
          console.error('Error parsing tasks from localStorage:', error);
        }
      }
    }
  }

  public checkExpiredTasks(): void {
    const now = new Date();
    this.tasks = this.tasks.filter(task => {
      if (task.expiryDate && new Date(task.expiryDate) < now) {
        return false;
      }
      return true;
    });
    this.saveTasksToLocalStorage();
  }
}
