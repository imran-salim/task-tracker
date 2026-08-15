import { readFileSync, writeFileSync } from 'fs';

const resetTaskFile = () => {
    let taskList = {
        tasks: []
    };
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
}

test('a task is added to an empty list', () => {
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
    let taskJson = JSON.parse(readFileSync('tasks.json'));
    expect(taskJson.tasks.length).toBe(1);
    expect(taskJson.tasks[0]).toEqual(newTask);
    resetTaskFile();
});

test('a task is added to a list of one tasks', () => {
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
    expect(tasksJson.tasks.length).toBe(2);
    expect(tasksJson.tasks[0]).toEqual(firstTask);
    expect(tasksJson.tasks[1]).toEqual(secondTask);
    resetTaskFile();
});
