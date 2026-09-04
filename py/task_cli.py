from sys import argv, exit
from datetime import datetime
from json import load, dump
from pathlib import Path


FILEPATH = Path("tasks.json")
COMMANDS = ["add", "update", "delete", "mark-in-progress", "mark-done", "list"]
STATUS = ["todo", "in-progress", "done"]

tasks = []

def save_json_file(FILEPATH, data):
    with open(FILEPATH, "w", encoding="utf-8") as file:
        dump(data, file, indent=4)

def load_json_file(FILEPATH):
    with open(FILEPATH, "r", encoding="utf-8") as file:
        tasks = load(file)
    return tasks

def print_tasks(tasks):
    for x in tasks:
        print(x)

def in_tasks(task_id, tasks):
    existing_ids = [x["id"] for x in tasks]
    if not task_id in existing_ids:
        return False
    return True

def validate_task_id(task_id, tasks):
    if not task_id.isdigit():
        exit("enter a number for the ID")
    if int(task_id) < 1:
        exit("task IDs cannot be less than 1")
    if not in_tasks(int(task_id), tasks):
        exit("task ID does not exist in the task list")
    return task_id

def validate_task_description(task_description):
    if len(task_description) < 1:
        exit("task description cannot be empty")
    return task_description

def next_id(tasks):
    if not tasks:
        return 1
    ids = [x["id"] for x in tasks]
    last_id = max(ids)
    return last_id + 1

def create_new_task(task_description, tasks):
    timestamp = datetime.now().isoformat()
    return {
        "id": next_id(tasks),
        "description": task_description,
        "status": "todo",
        "createdAt": timestamp,
        "updatedAt": timestamp
    }

def valid_num_of_args(arg_count):
    if arg_count < 1 or arg_count > 3:
        return False
    return True

def valid_first_arg(command):
    if not command in COMMANDS:
        return False
    return True
    

if __name__ == "__main__":
    if not FILEPATH.is_file():
        save_json_file(FILEPATH, [])
    tasks = load_json_file(FILEPATH)

    arg_count = len(argv)-1
    if not valid_num_of_args(arg_count):
        exit("wrong number of program arguments")

    if not valid_first_arg(argv[1]):
        exit("first argument must be a command")
    command = argv[1]

    if command == "add":
        if arg_count != 2:
            exit("add a task description when adding a task")
        task_description = validate_task_description(argv[2])
        new_task = create_new_task(task_description, tasks)
        tasks.append(new_task)
        print_tasks(tasks)

    if command == "update":
        if arg_count != 3:
            exit("add a task ID followed by a new description to update a task")
        task_id = validate_task_id(argv[2], tasks)
        task_description = validate_task_description(argv[3])
        for x in tasks:
            if x["id"] == int(task_id):
                timestamp = datetime.now().isoformat()
                x["description"] = task_description
                x["updatedAt"] = timestamp
                break
        print_tasks(tasks)

    if command == "delete":
        if arg_count != 2:
            exit("enter a task ID to delete")
        task_id = validate_task_id(argv[2], tasks)
        for x in tasks:
            if x["id"] == int(task_id):
                tasks.remove(x)
                break
        print_tasks(tasks)

    if command == "mark-in-progress" or command == "mark-done":
        if arg_count != 2:
            exit("enter a task ID to mark in-progress or done")
        task_id = validate_task_id(argv[2], tasks)
        for x in tasks:
            if x["id"] == int(task_id):
                timestamp = datetime.now().isoformat()
                if command == "mark-in-progress":
                    x["status"] = "in-progress"
                else:
                    x["status"] = "done"
                x["updatedAt"] = timestamp
                break
        print_tasks(tasks)

    if command == "list":
        if arg_count > 2:
            exit("list can be entered on its own or be followed by a status")   
        if arg_count == 1:
            print_tasks(tasks)
        else:
            status = argv[2]
            if not status in STATUS:
                exit("that is not a valid status")
            filtered_tasks = [x for x in tasks if x["status"] == status]
            print_tasks(filtered_tasks)

    if command != "list":
        save_json_file(FILEPATH, tasks)
