# Task Tracker

A command line task tracker, implemented twice: once in JavaScript (Node.js) and once in Python.

A solution to the [roadmap.sh Task Tracker project](https://roadmap.sh/projects/task-tracker).

Both implementations support the same commands:

| Command | Description |
| --- | --- |
| `add <description>` | Add a new task |
| `update <id> <description>` | Change a task's description |
| `delete <id>` | Remove a task |
| `mark-in-progress <id>` | Mark a task as in progress |
| `mark-done <id>` | Mark a task as done |
| `list [status]` | List tasks, optionally filtered by `todo`, `in-progress` or `done` |

## JavaScript (`js/`)

Tasks are persisted to a `tasks.json` file in the working directory, which is created automatically on first run. Each task has a UUID, a description, a status and created/updated timestamps. `update`, `delete` and the `mark-*` commands take the task's position in the list (starting at 1).

Requires Node.js. Run it from the `js` directory:

```
node app.js add "Buy groceries"
node app.js update 1 "Buy groceries and milk"
node app.js mark-in-progress 1
node app.js mark-done 1
node app.js delete 1
node app.js list
node app.js list done
```

### Tests

Unit tests are written with Jest, one file per command in `js/tests/`. From the `js` directory:

```
npm install
npm test
```

## Python (`py/`)

Tasks are persisted to a `tasks.json` file in the working directory, which is created automatically on first run. Each task has an integer id, a description, a status and created/updated timestamps. `update`, `delete` and the `mark-*` commands take the task's id.

Requires Python 3. Run it from the `py` directory:

```
python task-cli.py add "Buy groceries"
python task-cli.py update 1 "Buy groceries and milk"
python task-cli.py mark-in-progress 1
python task-cli.py mark-done 1
python task-cli.py delete 1
python task-cli.py list
python task-cli.py list done
```

Ids are never reused, so deleting a task leaves a gap in the numbering.

Next: replace the JSON file with a SQLite database.

## License

[MIT](LICENSE)