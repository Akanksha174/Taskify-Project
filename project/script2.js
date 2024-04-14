
function addTask() {
const taskName = document.getElementById('taskName').value;
const deadlineInput = document.getElementById('deadline').value;
const priority = document.getElementById('priority').value;

if (taskName.trim() === '') {
    alert('Please enter a task name.');
    return;
}

if (deadlineInput === '') {
    alert('Please set a deadline.');
    return;
}

if (priority === 'set') {
    alert('Please select a priority.');
    return;
}

const deadlineDate = new Date(deadlineInput);
const deadline = `${deadlineDate.getDate()}-${deadlineDate.toLocaleString('default', { month: 'short' })}-${deadlineDate.getFullYear()}`;

const taskTable = document.querySelector('.task-table tbody');
const newRow = taskTable.insertRow(-1);
newRow.innerHTML = `
    <td class="task-name">${taskName}</td>
    <td>${deadline}</td>
    <td class="${priority}-priority">${priority.charAt(0).toUpperCase() + priority.slice(1)}</td>
    <td class="fixed-buttons">
        <button onclick="editTask(this)" class="btn btn-secondary mr-1">Edit</button>
        <button onclick="deleteTask(this)" class="btn btn-danger mr-1">Delete</button>
        <button onclick="moveToLast(this)" class="btn btn-success">Done</button>
    </td>
`;
}



function deleteTask(button) {
    const row = button.closest('tr');
    row.remove();
}

function editTask(button) {
const row = button.closest('tr');
const taskNameCell = row.cells[0];
const deadlineCell = row.cells[1];
const priorityCell = row.cells[2];

// Save the original task details for potential rollback
const originalTaskName = taskNameCell.innerText;
const originalDeadline = deadlineCell.innerText;
const originalPriority = priorityCell.innerText;

// Replace task name with input field for editing
taskNameCell.innerHTML = `<input type="text" class="form-control" value="${originalTaskName}">`;

// Replace deadline with input field for editing
deadlineCell.innerHTML = `<input type="date" class="form-control" value="${originalDeadline}">`;

// Replace priority with dropdown for editing
const priorityValue = originalPriority.toLowerCase();
priorityCell.innerHTML = `
    <select class="custom-select">
        <option value="high" ${priorityValue === 'high' ? 'selected' : ''}>High Priority</option>
        <option value="medium" ${priorityValue === 'medium' ? 'selected' : ''}>Medium Priority</option>
        <option value="low" ${priorityValue === 'low' ? 'selected' : ''}>Low Priority</option>
    </select>
`;

// Change the button to a "Save" button
button.innerText = 'Save';
button.classList.remove('btn-secondary');
button.classList.add('btn-success');
button.setAttribute('onclick', 'saveTask(this)');

// Check if user edited the deadline or priority
const editedDeadline = deadlineCell.querySelector('input').value.trim();
const editedPriority = priorityCell.querySelector('select').value;
if (editedDeadline === originalDeadline && editedPriority === priorityValue) {
    alert('Please edit the deadline or priority.');
    // Rollback to original details
    taskNameCell.innerHTML = originalTaskName;
    deadlineCell.innerHTML = originalDeadline;
    priorityCell.innerHTML = originalPriority;
    // Change the button back to "Edit"
    button.innerText = 'Edit';
    button.classList.remove('btn-success');
    button.classList.add('btn-secondary');
    button.setAttribute('onclick', 'editTask(this)');
    return;
}
}
function saveTask(button) {
const row = button.closest('tr');
const taskNameCell = row.cells[0];
const deadlineCell = row.cells[1];
const priorityCell = row.cells[2];

const editedTaskName = taskNameCell.querySelector('input').value.trim();
const editedDeadline = deadlineCell.querySelector('input').value.trim();
const editedPriority = priorityCell.querySelector('select').value;

if (editedTaskName === '') {
    alert('Please enter a task name.');
    return;
}

if (editedDeadline === '') {
    alert('Please set a deadline.');
    return;
}

if (editedPriority === 'set') {
    alert('Please select a priority.');
    return;
}

taskNameCell.innerHTML = editedTaskName;
deadlineCell.innerHTML = editedDeadline;
priorityCell.innerHTML = editedPriority.charAt(0).toUpperCase() + editedPriority.slice(1);

// Change the button back to "Edit"
button.innerText = 'Edit';
button.classList.remove('btn-success');
button.classList.add('btn-secondary');
button.setAttribute('onclick', 'editTask(this)');
}

function editTask(button) {
const row = button.closest('tr');
const taskNameCell = row.cells[0];
const deadlineCell = row.cells[1];
const priorityCell = row.cells[2];

// Save the original task details for potential rollback
const originalTaskName = taskNameCell.innerText;
const originalDeadline = deadlineCell.innerText;
const originalPriority = priorityCell.innerText;

// Replace task name with input field for editing
taskNameCell.innerHTML = `<input type="text" class="form-control" value="${originalTaskName}">`;

// Replace deadline with input field for editing
deadlineCell.innerHTML = `<input type="date" class="form-control" value="${originalDeadline}">`;

// Replace priority with dropdown for editing
const priorityValue = originalPriority.toLowerCase();
priorityCell.innerHTML = `
    <select class="custom-select">
        <option value="high" ${priorityValue === 'high' ? 'selected' : ''}>High Priority</option>
        <option value="medium" ${priorityValue === 'medium' ? 'selected' : ''}>Medium Priority</option>
        <option value="low" ${priorityValue === 'low' ? 'selected' : ''}>Low Priority</option>
    </select>
`;

// Change the button to a "Save" button
button.innerText = 'Save';
button.classList.remove('btn-secondary');
button.classList.add('btn-success');
button.setAttribute('onclick', 'saveTask(this)');
}




function moveToLast(button) {
    // Function to move a completed task to the bottom
    const row = button.closest('tr');
    const taskTable = document.querySelector('.task-table tbody');
    taskTable.appendChild(row);
    row.classList.add('completed-task');
}