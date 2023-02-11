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
    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
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

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Remove Task
function removeTask(e) { 

    if (e.target.parentElement.classList.contains('delete-item')) {
        // confirm if user wants to delete
        if (confirm('Are You Sure?')) {
            // execute deletion
            e.target.parentElement.parentElement.remove();
        }
    }
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