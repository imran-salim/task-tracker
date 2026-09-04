# Task Tracker

A command-line task tracker implemented in Python as a solution to the [roadmap.sh Task Tracker project](https://roadmap.sh/projects/task-tracker).

The working implementation is in `py/task_cli.py`. It uses only the Python standard library and stores tasks in a local `tasks.json` file.

## Requirements

- Python 3
- No third-party packages

## Usage

Run the application from the `py` directory so that `tasks.json` is created and read there:

```sh
cd py
python3 task_cli.py add "Buy groceries"
```

The following commands are available:

| Command | Description |
| --- | --- |
| `add <description>` | Add a task with a `todo` status |
| `update <id> <description>` | Change a task's description |
| `delete <id>` | Delete a task |
| `mark-in-progress <id>` | Mark a task as in progress |
| `mark-done <id>` | Mark a task as done |
| `list` | List all tasks |
| `list <status>` | List tasks filtered by `todo`, `in-progress`, or `done` |

Examples:

```sh
python3 task_cli.py add "Buy groceries"
python3 task_cli.py update 1 "Buy groceries and milk"
python3 task_cli.py mark-in-progress 1
python3 task_cli.py mark-done 1
python3 task_cli.py list
python3 task_cli.py list done
python3 task_cli.py delete 1
```

Each task has an integer ID, description, status, creation timestamp, and update timestamp. IDs are assigned by incrementing the highest existing ID and are not reused while higher-numbered tasks remain. Any command that changes the task list saves the result to `tasks.json`.

## JavaScript Version

The `js` directory contains an earlier, unfinished implementation and is not the supported version of the project. It is not currently reliable because several argument-validation conditions use mutually exclusive checks joined with `&&`, so invalid argument counts and out-of-range task numbers are not rejected. Unrecognised actions can also exit without an error, and the Jest files test duplicated file-manipulation logic rather than invoking the command-line application itself.

Development therefore moved to the Python implementation, which provides the complete command set and consistent ID-based task handling. The JavaScript code remains in the repository for reference.

## License

[MIT](LICENSE)
