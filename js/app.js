import { readFileSync, writeFileSync, existsSync } from 'fs';
import { addTask, updateTask, markTask, deleteTask } from './actions.js'

let taskList = {
    tasks: []
};

if (process.argv.length < 3 && process.argv.length > 5) {
    console.trace('Invalid program arguments');
    process.exit(1);
}
if (!existsSync('tasks.json')) {
    writeFileSync('tasks.json', JSON.stringify((taskList)), undefined, 4);
}

let action = process.argv[2];
let tasksJson = JSON.parse(readFileSync('tasks.json'));
if (action === 'add') {
    if (!process.argv[3]) {
        console.trace('This action requires a description to add to the list');
        process.exit(1);
    }
    if (process.argv[4] !== undefined) {
        console.trace('No further argument is required given a description');
        process.exit(1);
    }
    addTask(tasksJson, taskList);
} else if (action === 'list') {
    let whichTasks = process.argv[3];
    if (!whichTasks) {
        tasksJson.tasks.forEach((task) =>  taskList.tasks.push(task));
        console.log(taskList.tasks);
    } else if (whichTasks === 'todo' || whichTasks === 'in-progress' || whichTasks === 'done') {
        tasksJson.tasks.forEach((task) => {
            if (task.status === whichTasks) {
                taskList.tasks.push(task);
            }
        });
        console.log(taskList.tasks);
    }
} else {
    tasksJson.tasks.forEach((task) =>  taskList.tasks.push(task));
    let taskCount = taskList.tasks.length;
    if (taskCount === 0) {
        console.trace('The list is empty');
        process.exit(1);
    }
    if (!process.argv[3]) {
        console.trace('This action requires a task number');
        process.exit(1);
    }
    if (process.argv[3] < 1 && process.argv[3] > taskCount) {
        console.trace('This action requires an task number in bounds of the existing list of tasks');
        process.exit(1);
    }

    let taskIndex = process.argv[3]-1;
    if (action === 'update') {
        let newDescription = process.argv[4];
        if (!newDescription) {
            console.trace('This action requires a new description after selecting a task number to update');
            process.exit(1);
        }
        if (process.argv[5] !== undefined) {
            console.trace('No further argument is required given a description');
            process.exit(1);
        }
        updateTask(taskIndex, newDescription, taskList);
    } else {
        if (process.argv[4] !== undefined) {
            console.trace('No further argument is required given a task number');
            process.exit(1);
        }
        if (action === 'mark-in-progress' || action === 'mark-done') {
            markTask(taskIndex, action, taskList);
        } else if (action === 'delete') {
            deleteTask(taskIndex, taskList);
        }
    }
}
