import { readFileSync, writeFileSync } from 'fs';

const resetTaskFile = () => {
    let taskList = {
        tasks: []
    };
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
}

test('an empty list is printed', () => {
    let taskList = {
        tasks: []
    };
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    expect(taskList).toEqual(tasksJson);
});

test('a list of two tasks is printed', () => {
    const firstTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "todo",
        createdAt: 0,
        updatedAt: 0
    };
    const secondTask = {
        id: crypto.randomUUID(),
        description: "Eat breakfast",
        status: "todo",
        createdAt: 1,
        updatedAt: 1
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(firstTask);
    taskList.tasks.push(secondTask);
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    expect(taskList).toEqual(tasksJson);
    resetTaskFile();
});

test('a list of todo tasks is printed', () => {
    const firstTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "done",
        createdAt: 0,
        updatedAt: 0
    };
    const secondTask = {
        id: crypto.randomUUID(),
        description: "Eat breakfast",
        status: "in-progress",
        createdAt: 1,
        updatedAt: 1
    };
    const thirdTask = {
        id: crypto.randomUUID(),
        description: "Drink coffee",
        status: "todo",
        createdAt: 1,
        updatedAt: 1
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(firstTask);
    taskList.tasks.push(secondTask);
    taskList.tasks.push(thirdTask);
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
    taskList = {
        tasks: []
    };
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.forEach((task) => {
        if (task.status === 'todo') {
            taskList.tasks.push(task);
        }
    });
    expect(taskList.tasks[0]).toEqual(thirdTask);
    resetTaskFile();
});

test('a list of in-progress tasks is printed', () => {
    const firstTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "done",
        createdAt: 0,
        updatedAt: 0
    };
    const secondTask = {
        id: crypto.randomUUID(),
        description: "Eat breakfast",
        status: "in-progress",
        createdAt: 1,
        updatedAt: 1
    };
    const thirdTask = {
        id: crypto.randomUUID(),
        description: "Drink coffee",
        status: "todo",
        createdAt: 1,
        updatedAt: 1
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(firstTask);
    taskList.tasks.push(secondTask);
    taskList.tasks.push(thirdTask);
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
    taskList = {
        tasks: []
    };
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.forEach((task) => {
        if (task.status === 'in-progress') {
            taskList.tasks.push(task);
        }
    });
    expect(taskList.tasks[0]).toEqual(secondTask);
    resetTaskFile();
});

test('a list of done tasks is printed', () => {
    const firstTask = {
        id: crypto.randomUUID(),
        description: "Brush teeth",
        status: "done",
        createdAt: 0,
        updatedAt: 0
    };
    const secondTask = {
        id: crypto.randomUUID(),
        description: "Eat breakfast",
        status: "in-progress",
        createdAt: 1,
        updatedAt: 1
    };
    const thirdTask = {
        id: crypto.randomUUID(),
        description: "Drink coffee",
        status: "todo",
        createdAt: 1,
        updatedAt: 1
    };
    let taskList = {
        tasks: []
    };
    taskList.tasks.push(firstTask);
    taskList.tasks.push(secondTask);
    taskList.tasks.push(thirdTask);
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
    taskList = {
        tasks: []
    };
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.forEach((task) => {
        if (task.status === 'done') {
            taskList.tasks.push(task);
        }
    });
    expect(taskList.tasks[0]).toEqual(firstTask);
    resetTaskFile();
});
