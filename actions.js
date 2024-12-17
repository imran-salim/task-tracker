import { writeFileSync } from 'fs';

const Status = Object.freeze({
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
});

const addTask = (tasksJson, taskList) => {
    const newTask = {
        id: crypto.randomUUID(),
        description: process.argv[3],
        status: Status.TODO,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    tasksJson.tasks.forEach((task) =>  taskList.tasks.push(task));
    taskList.tasks.push((newTask));
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

const updateTask = (taskIndex, newDescription, taskList) => {
    taskList.tasks[taskIndex].description = newDescription;
    taskList.tasks[taskIndex].updatedAt = Date.now();
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

const markTask = (taskIndex, action, taskList) => {
    if (action === 'mark-in-progress') {
        taskList.tasks[taskIndex].status = Status.IN_PROGRESS;
    } else {
        taskList.tasks[taskIndex].status = Status.DONE;
    }
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

const deleteTask = (taskIndex, taskList) => {
    taskList.tasks.splice(taskIndex, 1);
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
}

export { Status, addTask, updateTask, markTask, deleteTask };
