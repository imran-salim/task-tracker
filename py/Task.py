from datetime import datetime

class Task:
    def __init__(self, id, description, status="todo"):
        self.id = id
        self.description = description
        self.status = status
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update_status(self, new_status):
        self.status = new_status
        self.updated_at = datetime.now()

    def update_description(self, new_description):
        self.description = new_description
        self.updated_at = datetime.now()
