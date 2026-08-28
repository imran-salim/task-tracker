from sys import argv, exit

COMMANDS = ["add", "update", "delete", "mark-in-progress", "mark-done", "list"]

tasks = ["a"]

if __name__ == "__main__":
    arg_count = len(argv)-1
    if arg_count < 1 or arg_count > 3:
        exit("wrong number of program arguments")

    command = argv[1]
    if not command in COMMANDS:
        exit("first argument must be a command")

    if command == "add":
        if arg_count != 3:
            exit("add a task description when adding a task")
        task_description = argv[2]
        if len(task_description) < 1:
            exit("add a task description when adding a task")

    if command == "update":
        if arg_count != 3:
            exit("add a task ID followed by a new description to update a task")
        task_id = argv[2]
        if not task_id.isdigit():
            exit("enter a number for the ID")
        task_count = len(tasks)
        if task_count < 1:
            exit("there are no tasks to update")
        if int(task_id) > task_count:
            exit("that task ID does not exist in your tasks")

        task_description = argv[3]
        if len(task_description) < 1:
            exit("add a task description when updating a task")

    if command == "delete" or command == "mark-in-progress" or command == "mark-done":
        if arg_count != 2:
            exit("enter a task ID to delete, mark in-progress, or mark done")
        task_id = argv[2]
        if not task_id.isdigit():
            exit("enter a number for the ID")
        if int(task_id) < 1:
            exit("task IDs cannot be less than 1")
        task_count = len(tasks)
        if task_count < 1:
            exit("there are no tasks to delete, mark in-progress, or mark done")
        if int(task_id) > task_count:
            exit("that task ID does not exist in your tasks")

    if command == "list":
        if arg_count < 1 or arg_count > 2:
            exit("list can be entered on its own or be followed by a status")
        if arg_count == 1:
            print(tasks)
        else:
            for x in tasks:
                print(x)

