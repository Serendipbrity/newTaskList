// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() { 
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() { 
    let tasks;
    // check if there are any tasks in local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
// loop through tasks
    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove" style="color:red"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
 }
 
// Add Task
function addTask(e) {
    // if nothing is entered in the input field
    if (taskInput.value === '') {
        alert('Add a task');
    }
    
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove" style="color:red"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

// Store in local storage
storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    // check if there are any tasks in local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
//  add new task to the tasks array
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) { 

    if (e.target.parentElement.classList.contains('delete-item')) {
        // confirm if user wants to delete
        if (confirm('Are You Sure?')) {
            // execute deletion (from DOM)
            e.target.parentElement.parentElement.remove();

            // remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) { 
    let tasks;
    // check if there are any tasks in local storage
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
// loop through tasks
    tasks.forEach(function(task, index) {
        // if the text content of the task matches the text content of the task in local storage
        if (taskItem.textContent === task) {
            // remove the task from local storage
            tasks.splice(index, 1);
        }
    });
    // set the local storage to the updated tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks));
 }
 
// Clear Tasks
function clearTasks() { 
    // taskList.innerHTML = ''; // one way

    // faster way
    // while there is a first child (still something in the list)
    while (taskList.firstChild) {
        // delete
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from local storage
    clearTasksFromLocalStorage();
}
 
// Clear Tasks from Local Storage so that when you click clear tasks and refresh the page, they stay deleted
function clearTasksFromLocalStorage() { 
    localStorage.clear();
 }

// Filter Tasks
function filterTasks(e) { 
    // get the text that is typed in the input field and convert to lowercase so we can match it to the tasks
    const text = e.target.value.toLowerCase();

    // querySelectorAll returns a node list
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            // if theres no match
            if (item.toLowerCase().indexOf(text) != -1) {
                // show the task
                task.style.display = 'block';
            } else {
                // hide the task
                task.style.display = 'none';
            }
        }
    );
 }