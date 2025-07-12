export {};
import * as readline from "readline";

interface TodoItem {
  id: number;
  taskName: string;
  completed: false;
}

let newId = 1;
const todoItems: TodoItem[] = [];

const addTodo = (task: string): void => {
  const newTodo: TodoItem = {
    id: newId++,
    taskName: task,
    completed: false,
  };
  todoItems.push(newTodo);
};

const editTodo = (id: Number, newTask: string): void => {
  const update = todoItems.find((todo) => todo.id === id);
  if (update) {
    console.log(`Updated: [${update.id}] "${update.taskName}" → "${newTask}"`);
    update.taskName = newTask;
  } else {
    console.log("please provide the correct id you want to edit");
  }
};
console.log("Test");

const listTodos = (): void => {
  console.log("Todo List:");
  todoItems.forEach((todo) => {
    const status = todo.completed ? "✅" : "";
    console.log(`[${todo.id}] ${status} ${todo.taskName}`);
  });
};

const removeTodo = (id: Number): void => {
  console.log(`remove tod ${id}`);
  const idx = todoItems.findIndex((todo) => todo.id === id);
  if (idx !== -1) {
    const removed = todoItems.splice(idx, 1)[0];
    console.log(`Removed: [${removed.id}] ${removed.taskName}`);
  } else {
    console.log(`Todo with ID ${id} not found.`);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log("\n=== Todo Menu ===");
  console.log("1. Add Todo");
  console.log("2. Edit Todo");
  console.log("3. Delete Todo");
  console.log("4. List Todos");
  console.log("5. Exit");
  rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice: string): void {
  switch (choice.trim()) {
    case "1":
      rl.question("Enter task: ", (task) => {
        addTodo(task);
        showMenu();
      });
      break;

    case "2":
      rl.question("Enter ID to edit: ", (idStr) => {
        const id = parseInt(idStr);
        rl.question("Enter new task: ", (newTask) => {
          editTodo(id, newTask);
          showMenu();
        });
      });
      break;

    case "3":
      rl.question("Enter ID to delete: ", (idStr) => {
        const id = parseInt(idStr);
        removeTodo(id);
        showMenu();
      });
      break;

    case "4":
      listTodos();
      showMenu();
      break;

    case "5":
      console.log("Goodbye!");
      rl.close();
      break;

    default:
      console.log("Invalid option. Try again.");
      showMenu();
      break;
  }
}

showMenu();
