import { readFileSync, writeFileSync } from 'fs';

test('a todo task is marked as in-progress', () => {
    const newTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "todo",
        createdAt: 0,
        updatedAt: 0
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(newTask);
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
    let oldStatus = taskList.tasks[0].status;
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks[0].status = 'in-progress';
    expect(oldStatus).not.toBe(tasksJson.tasks[0].status);
});

test('a in-progress task is marked as done', () => {
    const newTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "in-progress",
        createdAt: 0,
        updatedAt: 0
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(newTask);
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
    let oldStatus = taskList.tasks[0].status;
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks[0].status = 'done';
    expect(oldStatus).not.toBe(tasksJson.tasks[0].status);
});

test('a todo task is marked as done', () => {
    const newTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "todo",
        createdAt: 0,
        updatedAt: 0
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(newTask);
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
    let oldStatus = taskList.tasks[0].status;
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks[0].status = 'done';
    expect(oldStatus).not.toBe(tasksJson.tasks[0].status);
});
