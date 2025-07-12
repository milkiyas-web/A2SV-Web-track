"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
let newId = 1;
const todoItems = [];
const addTodo = (task) => {
    const newTodo = {
        id: newId++,
        taskName: task,
        completed: false,
    };
    todoItems.push(newTodo);
};
const editTodo = (id, newTask) => {
    const update = todoItems.find((todo) => todo.id === id);
    if (update) {
        console.log(`Updated: [${update.id}] "${update.taskName}" → "${newTask}"`);
        update.taskName = newTask;
    }
    else {
        console.log("please provide the correct id you want to edit");
    }
};
console.log("Test");
const listTodos = () => {
    console.log("Todo List:");
    todoItems.forEach((todo) => {
        const status = todo.completed ? "✅" : "";
        console.log(`[${todo.id}] ${status} ${todo.taskName}`);
    });
};
const removeTodo = (id) => {
    console.log(`remove tod ${id}`);
    const idx = todoItems.findIndex((todo) => todo.id === id);
    if (idx !== -1) {
        const removed = todoItems.splice(idx, 1)[0];
        console.log(`Removed: [${removed.id}] ${removed.taskName}`);
    }
    else {
        console.log(`Todo with ID ${id} not found.`);
    }
};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function showMenu() {
    console.log("\n=== Todo Menu ===");
    console.log("1. Add Todo");
    console.log("2. Edit Todo");
    console.log("3. Delete Todo");
    console.log("4. List Todos");
    console.log("5. Exit");
    rl.question("Choose an option: ", handleMenu);
}
function handleMenu(choice) {
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
