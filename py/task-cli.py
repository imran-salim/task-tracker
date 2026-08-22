from sys import argv, exit
from json import load, dump
from datetime import datetime
from pathlib import Path
from Task import Task


COMMANDS = ["add", "update", "delete", "mark-in-progress", "mark-done", "list"]
STATUS = ["done", "todo", "in-progress"]
USAGE = """
    Usage: python main.py <command> [arguments]

    Commands:
        add <description>               Add a new task
        update <id> <description>       Change a task's description
        delete <id>                     Remove a task
        mark-in-progress <id>           Mark a task as in progress
        mark-done <id>                  Mark a task as done
        list [status]                   List tasks, optionally filtered
                                        by: todo, in-progress, done
"""


def list_tasks(tasks, status=""):
    if not status:
        for x in tasks:
            print(x)
    else:
        for x in tasks:
            if x["status"] == status:
                print(x)

def next_id(tasks):
    if not tasks:
        return 1
    ids = [x["id"] for x in tasks]
    last_id = max(ids)
    return last_id + 1


if __name__ == "__main__":
    file_path = Path("tasks.json")
    if not file_path.is_file():
        with open(file_path, "w", encoding="utf-8") as file:
            dump([], file)

    with open(file_path, "r", encoding="utf-8") as file:
        tasks = load(file)

    ARG_COUNT = len(argv)-1
    if ARG_COUNT < 1 or ARG_COUNT > 3:
        exit(USAGE)

    CMD = argv[1]
    if not CMD in COMMANDS:
        exit(USAGE)

    if CMD == "update" or CMD == "delete" or CMD == "mark-in-progress" or CMD == "mark-done":
        if ARG_COUNT < 2:
            exit(USAGE)
        if not argv[2].isdigit():
            exit(USAGE)
        task_number = int(argv[2])
        task_ids = [x["id"] for x in tasks]
        if not task_number in task_ids:
            exit(USAGE)

        if CMD == "update": 
            if ARG_COUNT != 3:
                exit(USAGE)         
            task_description = argv[3]
            for x in tasks:
                if x["id"] == task_number:
                    x["description"] = task_description
                    x["updatedAt"] = datetime.now().isoformat()
                    with open(file_path, "w", encoding="utf-8") as file:
                        dump(tasks, file, indent=4)
                    break
            list_tasks(tasks)
        else:
            if CMD == "delete":
                for x in tasks:
                    if x["id"] == task_number:
                        tasks.remove(x)
                        break
                with open(file_path, "w", encoding="utf-8") as file:
                    dump(tasks, file, indent=4)
                list_tasks(tasks)
            elif CMD == "mark-in-progress":
                for x in tasks:
                    if x["id"] == task_number:
                        x["status"] = "in-progress"
                        x["updatedAt"] = datetime.now().isoformat()
                        with open(file_path, "w", encoding="utf-8") as file:
                            dump(tasks, file, indent=4)
                        break
                list_tasks(tasks)
            elif CMD == "mark-done":
                for x in tasks:
                    if x["id"] == task_number:
                        x["status"] = "done"
                        x["updatedAt"] = datetime.now().isoformat()
                        with open(file_path, "w", encoding="utf-8") as file:
                            dump(tasks, file, indent=4)
                        break
                list_tasks(tasks)
            else:
                exit(USAGE)
    elif CMD == "add":
        if ARG_COUNT != 2:
            exit(USAGE)
        task_description = f"{argv[2]}"
        task_id = next_id(tasks)
        new_task = Task(id=task_id, description=task_description).to_json()
        tasks.append(new_task)
        with open(file_path, "w", encoding="utf-8") as file:
            dump(tasks, file, indent=4)
        list_tasks(tasks)
    elif CMD == "list":
        if ARG_COUNT == 2:
            task_status = argv[2]
            if not task_status in STATUS:
                exit(USAGE)
            list_tasks(tasks, task_status)
        elif ARG_COUNT == 1:
            list_tasks(tasks)
        else:
            exit(USAGE)
