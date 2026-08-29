from sys import argv, exit
from datetime import datetime

COMMANDS = ["add", "update", "delete", "mark-in-progress", "mark-done", "list"]
STATUS = ["todo", "in-progress", "done"]

# tasks = []
timestamp_1 = datetime.now().isoformat()
timestamp_2 = datetime.now().isoformat()
tasks = [
    {
        "id": 1,
        "description": "drink water",
        "status": "in-progress",
        "createdAt": timestamp_1,
        "updatedAt": timestamp_1
    },
    {
        "id": 2,
        "description": "drink coke",
        "status": "todo",
        "createdAt": timestamp_2,
        "updatedAt": timestamp_2
    }
]

def next_id(tasks):
    if not tasks:
        return 1
    ids = [x["id"] for x in tasks]
    last_id = max(ids)
    return last_id + 1

def in_tasks(task_id, tasks):
    existing_ids = [x["id"] for x in tasks]
    if not task_id in existing_ids:
        return False
    return True


if __name__ == "__main__":
    arg_count = len(argv)-1
    if arg_count < 1 or arg_count > 3:
        exit("wrong number of program arguments")

    command = argv[1]
    if not command in COMMANDS:
        exit("first argument must be a command")

    if command == "add":
        if arg_count != 2:
            exit("add a task description when adding a task")
        task_description = argv[2]
        if len(task_description) < 1:
            exit("add a task description when adding a task")

        timestamp = datetime.now().isoformat()
        new_task = {
            "id": next_id(tasks),
            "description": task_description,
            "status": "todo",
            "createdAt": timestamp,
            "updatedAt": timestamp
        }
        tasks.append(new_task)
        print(tasks)

    if command == "update":
        if arg_count != 3:
            exit("add a task ID followed by a new description to update a task")
        task_id = argv[2]
        if not task_id.isdigit():
            exit("enter a number for the ID")
        if int(task_id) < 1:
            exit("task IDs cannot be less than 1")
        if not in_tasks(int(task_id), tasks):
            exit("task ID does not exist in the task list")

        task_description = argv[3]
        if len(task_description) < 1:
            exit("add a task description when updating a task")

        for x in tasks:
            if x["id"] == int(task_id):
                timestamp = datetime.now().isoformat()
                x["description"] = task_description
                x["updatedAt"] = timestamp
                break
        print(tasks)

    if command == "delete":
        if arg_count != 2:
            exit("enter a task ID to delete")
        task_id = argv[2]
        if not task_id.isdigit():
            exit("enter a number for the ID")
        if int(task_id) < 1:
            exit("task IDs cannot be less than 1")
        if not in_tasks(int(task_id), tasks):
            exit("task ID does not exist in the task list")

        for x in tasks:
            if x["id"] == int(task_id):
                tasks.remove(x)
                break
        print(tasks)

    if command == "mark-in-progress" or command == "mark-done":
        if arg_count != 2:
            exit("enter a task ID to mark in-progress or done")
        task_id = argv[2]
        if not task_id.isdigit():
            exit("enter a number for the ID")
        if int(task_id) < 1:
            exit("task IDs cannot be less than 1")
        if not in_tasks(int(task_id), tasks):
            exit("task ID does not exist in the task list")

        for x in tasks:
            if x["id"] == int(task_id):
                timestamp = datetime.now().isoformat()
                if command == "mark-in-progress":
                    x["status"] = "in-progress"
                else:
                    x["status"] = "done"
                x["updatedAt"] = timestamp
                break
        print(tasks)

    if command == "list":
        if arg_count < 1 or arg_count > 2:
            exit("list can be entered on its own or be followed by a status")
        if arg_count == 1:
            print(tasks)
        else:
            status = argv[2]
            if not status in STATUS:
                exit("that is not a valid status")
            filtered_tasks = [x for x in tasks if x["status"] == status]
            print(filtered_tasks)
