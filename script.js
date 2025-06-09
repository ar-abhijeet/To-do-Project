document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("input-box");
  const inputButton = document.getElementById("btn-red");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];

  tasks.forEach(task => renderTask(task))

  inputButton.addEventListener("click", () => {
    const taskText = inputBox.value.trim();
    if (taskText === "") return;

    const newtask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newtask);
    saveTasks();
    renderTask(newtask);
    inputBox.value = "";
    console.log(tasks);
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    li.innerHTML= `
    <span>${task.text}</span>
    <button id = "delete-button">Delete</button>`;

    li.addEventListener('click',(e)=>{
      if(e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    })

    li.querySelector('button').addEventListener('click',(e)=>{
      e.stopPropagation();
      tasks = tasks.filter(t=> t.id !== task.id);
      li.remove();
      saveTasks();
    })
    todoList.appendChild(li);
  }
});


