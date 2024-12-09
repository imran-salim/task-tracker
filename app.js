import { readFileSync, writeFileSync, existsSync } from 'fs';

const Status = Object.freeze({
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
});

let taskList = {
    tasks: []
};

const addTask = () => {
    const newTask = {
        id: crypto.randomUUID(),
        description: process.argv[3],
        status: Status.TODO,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.forEach((task) =>  taskList.tasks.push(task));
    taskList.tasks.push((newTask));
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

const updateTask = (taskIndex, newDescription) => {
    taskList.tasks[taskIndex].description = newDescription;
    taskList.tasks[taskIndex].updatedAt = Date.now();
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

const markTask = (taskIndex, action) => {
    if (action === 'mark-in-progress') {
        taskList.tasks[taskIndex].status = Status.IN_PROGRESS;
    } else {
        taskList.tasks[taskIndex].status = Status.DONE;
    }
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

const deleteTask = (taskIndex) => {
    taskList.tasks.splice(taskIndex, 1);
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

if (process.argv.length < 3 && process.argv.length > 5) {
    console.trace('Invalid program arguments');
    process.exit(1);
}
if (!existsSync('tasks.json')) {
    writeFileSync('tasks.json', JSON.stringify((taskList)), undefined, 4);
}

let action = process.argv[2];
if (action === 'add') {
    if (process.argv[3] === undefined) {
        console.trace('This action requires a description to add to the list');
        process.exit(1);
    }
    if (process.argv[4] !== undefined) {
        console.trace('No further argument is required given a description');
        process.exit(1);
    }
    addTask();
} else if (action === 'list') {
    let whichTasks = process.argv[3];
    if (whichTasks === undefined) {
        let tasksJson = JSON.parse(readFileSync('tasks.json'));
        tasksJson.tasks.forEach((task) =>  taskList.tasks.push(task));
        console.log(taskList.tasks);
    } else if (whichTasks === 'todo' || whichTasks === 'in-progress' || whichTasks === 'done') {
        let tasksJson = JSON.parse(readFileSync('tasks.json'));
        tasksJson.tasks.forEach((task) => {
            if (task.status === whichTasks) {
                taskList.tasks.push(task)
            }
        });
        console.log(taskList.tasks);
    }
} else {
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.forEach((task) =>  taskList.tasks.push(task));
    let taskCount = taskList.tasks.length;
    if (taskCount === 0) {
        console.trace('The list is empty');
        process.exit(1);
    }
    if (process.argv[3] === undefined) {
        console.trace('This action requires a task number');
        process.exit(1);
    }
    if (process.argv[3] < 1 && process.argv[3] > taskCount) {
        console.trace('This action requires an task number in bounds of the existing list of tasks');
        process.exit(1);
    }

    let taskIndex = process.argv[3]-1;
    if (action === 'update') {
        if (process.argv[4] === undefined) {
            console.trace('This action requires a new description after selecting a task number to update');
            process.exit(1);
        }
        if (process.argv[5] !== undefined) {
            console.trace('No further argument is required given a description');
            process.exit(1);
        }
        let newDescription = process.argv[4];
        updateTask(taskIndex, newDescription);
    } else {
        if (process.argv[4] !== undefined) {
            console.trace('No further argument is required given a task number');
            process.exit(1);
        }
        if (action === 'mark-in-progress' || action === 'mark-done') {
            markTask(taskIndex, action);
        } else if (action === 'delete') {
            deleteTask(taskIndex);
        }
    }
}

export default { addTask, updateTask, markTask, deleteTask, Status };
