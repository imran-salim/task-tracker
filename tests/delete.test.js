import { readFileSync, writeFileSync } from 'fs';

const resetTaskFile = () => {
    let taskList = {
        tasks: []
    };
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
}

test('a list of one task is emptied', () => {
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
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.splice(0, 1);
    writeFileSync('tasks.json', JSON.stringify((tasksJson), undefined, 4));
    expect(tasksJson).not.toEqual(taskList);
    resetTaskFile();
});

test('a list of two tasks has its second task deleted', () => {
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
    writeFileSync('tasks.json', JSON.stringify(taskList, undefined, 4));
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    tasksJson.tasks.splice(1, 1);
    writeFileSync('tasks.json', JSON.stringify((tasksJson), undefined, 4));
    expect(tasksJson).not.toEqual(taskList);
    expect(tasksJson.tasks[0]).toEqual(taskList.tasks[0]);
    resetTaskFile();
});
