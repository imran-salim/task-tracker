import { readFileSync, writeFileSync } from 'fs';

test('the only task in the list is updated', () => {
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
    let taskIndex = 0;
    let oldDescription = 'Brush teeth';
    let newDescription = 'Shower';
    let oldUpdatedAt = newTask.updatedAt;
    taskList.tasks[taskIndex].description = newDescription;
    taskList.tasks[taskIndex].updatedAt = Date.now();
    writeFileSync('tasks.json', JSON.stringify((taskList), undefined, 4));
    let tasksJson = JSON.parse(readFileSync('tasks.json'));
    expect(tasksJson.tasks[0].description).not.toEqual(oldDescription);
    expect(tasksJson.tasks[0].updatedAt).not.toBe(oldUpdatedAt);
});
