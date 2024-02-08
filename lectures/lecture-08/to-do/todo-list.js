// Exercise #2: Write code so that whenever the user types a new item in the input box and clicks the "Add" button or hits [Enter] , the item is added to the list ( ul#todo-list ) as an <li> element.
// Clear the input box after adding the item
// Only add the item if the input box is not empty

// const addTaskButton = document.getElementById("add-todo");
// const todoInput = document.querySelector("#todo-input");
// function addTodoItemFromInput() {
//     const description = todoInput.value;
//     if(description) {
//         const newTask = document.createElement("li");
//         newTask.innerText = description;
//         const taskList = document.querySelector("#todo-list");
//         taskList.append(newTask);
//         todoInput.value = '';
//     }
// }
// addTaskButton.addEventListener("click", addTodoItemFromInput);
// todoInput.addEventListener("keydown", (event) => {
//     if(event.key === "Enter") {
//         addTodoItemFromInput();
//     }
// });

// Exercise #3: Modify the code above so that: Every "todo" item has a "Done" button (a <button> element with class done) Clicking the "Done" button toggles the done class on the surrounding <li /> element (which should add a strikethrough to the text)

// const addTaskButton = document.getElementById("add-todo");
// const todoInput = document.querySelector("#todo-input");
// function addTodoItemFromInput() {
//     const description = todoInput.value;
//     if(description) {
//         const taskList = document.querySelector("#todo-list"); const newTask = document.createElement("li");
//         const doneButton = document.createElement("button");
//         doneButton.classList.add("done");
//         doneButton.innerText = "Done";
//         doneButton.addEventListener("click", () => {
//             newTask.classList.toggle("done");
//         });
//         newTask.append(description, doneButton);
//         taskList.append(newTask);
//         todoInput.value = '';
//     }
// }

// addTaskButton.addEventListener("click", addTodoItemFromInput);
// todoInput.addEventListener("keydown", (event) => {
//     if(event.key === "Enter") {
//         addTodoItemFromInput();
//     }
// }); 

// One potential improvement to the solution: separate the logic for adding a new item from the logic of getting the description from the input box (for example, we can call addTodoItem independently with some todo items on the bottom). 

const addTaskButton = document.getElementById("add-todo");
const todoInput = document.querySelector("#todo-input");
function addTodoItem(description) {
    const taskList = document.querySelector("#todo-list");
    const newTask = document.createElement("li");
    const doneButton = document.createElement("button");
    doneButton.classList.add("done");
    doneButton.innerText = "Done";
    doneButton.addEventListener("click", () => {
        newTask.classList.toggle("done");
    });
    newTask.append(description, doneButton);
    taskList.append(newTask);
}

function addTodoItemFromInput() {
    if(todoInput.value) {
        addTodoItem(todoInput.value);
        todoInput.value = '';
    }
}

addTaskButton.addEventListener("click", addTodoItemFromInput);
todoInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        addTodoItemFromInput();
    }
});

addTodoItem("Learn about JavaScript");
addTodoItem("Learn about HTML");
addTodoItem("Learn about CSS"); 