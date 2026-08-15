from sys import argv, exit
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
            print(f"{x.id}\t{x.description}\t\t{x.status}\n{x.created_at}\n{x.updated_at}\n")
    else:
        for x in tasks:
            if x.status == status:
                print(f"{x.id}\t{x.description}\t\t{x.status}\n{x.created_at}\n{x.updated_at}\n")

def next_id(tasks):
    if not tasks:
        return 1
    ids = [x.id for x in tasks]
    last_id = max(ids)
    return last_id + 1


if __name__ == "__main__":
    tasks = [Task(id=1, description="Buy groceries"),
             Task(id=2, description="Clean apartment", status="in-progress"),
             Task(id=3, description="Take omega-3 and multivitamin", status="done"),
             Task(id=4, description="Eat dinner")]

    ARG_COUNT = len(argv)-1
    if ARG_COUNT < 1 or ARG_COUNT > 3:
        exit(USAGE)

    CMD = argv[1]
    if not CMD in COMMANDS:
        exit(USAGE)

    if ARG_COUNT == 1:
        if CMD == "list":
            list_tasks(tasks)

    if ARG_COUNT == 2:
        if CMD == "add":
            task_description = f"{argv[2]}"
            task_id = next_id(tasks)
            new_task = Task(id=task_id, description=task_description)
            tasks.append(new_task)
            list_tasks(tasks)

        elif CMD == "list":
            task_status = argv[2]
            if not task_status in STATUS:
                exit(USAGE)
            list_tasks(tasks, task_status)

        else:
            if not argv[2].isdigit():
                exit(USAGE)
            task_number = int(argv[2])
            
            task_ids = [x.id for x in tasks]
            if not task_number in task_ids:
                exit(USAGE)

            if CMD == "delete":
                for x in tasks:
                    if x.id == task_number:
                        tasks.remove(x)
                        break
                list_tasks(tasks)

            if CMD == "mark-in-progress":
                for x in tasks:
                    if x.id == task_number:
                        x.update_status("in-progress")
                        break
                list_tasks(tasks)

            if CMD == "mark-done":
                for x in tasks:
                    if x.id == task_number:
                        x.update_status("done")
                        break
                list_tasks(tasks)

    if ARG_COUNT == 3 and CMD == "update":
        if not argv[2].isdigit():
            exit(USAGE)
            
        task_number = int(argv[2])
        task_description = argv[3]

        task_ids = [x.id for x in tasks]
        if not task_number in task_ids:
            exit(USAGE)

        for x in tasks:
            if x.id == task_number:
                x.update_description(task_description)
                break
        list_tasks(tasks)
