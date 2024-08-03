'use strict';
const ipTask = document.querySelector('#input-task');
const btnAdd = document.querySelector('#btn-add');
const taskForm = document.querySelector('#todo-container');
const taskList = document.querySelector('#todo-list');
const taskInput = document.querySelector('#input-task');
const taskItem = document.querySelector('.task-item');
class Task {
  constructor(task, owner) {
    this.task = task;
    this.owner = owner;
    this.isDone = false;
  }
}

//tạo class User
class Username {
  constructor(username) {
    // super(username);
    this.username = username;
    this.todoArr = this.loadTasksFromLocalStorage() || [];
  }
  //thêm task
  addTask(taskContent) {
    const newTask = new Task(taskContent, this.username);
    this.todoArr.push(newTask);
    this.saveTasksFromLocalStorage();
    this.displayTasks();
  }
  //Toggle task
  toggleTask(index) {
    this.todoArr[index].isDone = !this.todoArr[index].isDone;
    this.saveTasksFromLocalStorage();
    this.displayTasks();
  }
  //Xóa task
  deleteTask(index) {
    this.todoArr.splice(index, 1);
    this.saveTasksFromLocalStorage();
    this.displayTasks();
  }
  //lưu tác vụ
  saveTasksFromLocalStorage() {
    localStorage.setItem(`task_${this.username}`, JSON.stringify(this.todoArr));
  }
  //loadTask
  loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem(`task_${this.username}`);
    return tasks ? JSON.parse(tasks) : null;
  }
  //hiển thị các task
  displayTasks() {
    taskList.innerHTML = '';
    this.todoArr.forEach(function (task, index) {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
      ${task.task}
                <input type="checkbox" id="task_${index}" ${
        task.isDone ? 'checked' : ''
      } onchange="user.toggleTask(${index})" style="position: relative;width: 20px;top: -5px;right: 10px;">
						<span class="close" onclick="user.deleteTask(${index})">×</span>
            `;
      taskList.appendChild(taskItem);
    });
  }
}

//Thay thế bằng tên người dùng thực tế
const usernames = 'exampleUser';
const user = new Username(usernames);

// Xử lý thêm tác vụ mới khi nhấp vào nút "add Task"
btnAdd.addEventListener('click', () => {
  const taskContent = taskInput.value.trim();

  if (taskContent == '') {
    alert('vui lòng nhập đủ thông tin!');
  } else {
    user.addTask(taskContent);
    taskInput.value = '';
  }
});

// Display initial tasks on page load
user.displayTasks();
