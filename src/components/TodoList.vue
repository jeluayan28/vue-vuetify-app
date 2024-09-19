<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="d-flex justify-center align-center fill-height"
      >
        <v-card elevation="10" class="pa-5" color="yellow lighten-4" max-width="600">
          <v-row class="justify-center">
            <v-icon large color="yellow darken-3">mdi-emoticon-happy-outline</v-icon>
            <h2 class="ml-2" style="font-family: cursive;">To-Do List</h2>
          </v-row>

          <!-- Task Input -->
          <v-row class="mt-4">
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="newTask"
                label="Add a new task"
                outlined
                color="yellow lighten-3"
                class="cute-text-field"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn color="yellow darken-3" block @click="addTask">Add</v-btn>
            </v-col>
          </v-row>

          <!-- Task List -->
          <v-list dense>
            <v-list-item
              v-for="(task, index) in tasks"
              :key="index"
              class="task-item"
            >
              <v-list-item-content class="task-content">
                <div class="task-details">
                  <v-checkbox
                    v-model="task.completed"
                    class="mr-2 custom-checkbox"
                  ></v-checkbox>
                  <v-list-item-title :class="{ done: task.completed }">
                    <template v-if="task.editing">
                      <v-text-field
                        v-model="task.text"
                        outlined
                        color="yellow lighten-3"
                        hide-details
                      ></v-text-field>
                    </template>
                    <template v-else>
                      {{ truncateText(task.text, 5) }}
                    </template>
                  </v-list-item-title>
                </div>
                <div class="task-actions">
                  <v-btn
                    v-if="task.editing"
                    icon
                    @click="updateTask(index)"
                  >
                    <span role="img" aria-label="check">✅</span>
                  </v-btn>
                  <v-btn
                    v-if="!task.editing"
                    icon
                    @click="editTask(index)"
                  >
                    <span role="img" aria-label="pencil">✏️</span>
                  </v-btn>
                  <v-btn
                    icon
                    @click="removeTask(index)"
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <!-- Custom Alert Dialog -->
          <v-dialog v-model="alert" max-width="400">
            <v-card>
              <v-card-title class="headline">Alert</v-card-title>
              <v-card-text>Please enter a task.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="yellow darken-3" text @click="alert = false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Retrieve stored tasks
      alert: false, // Control the alert dialog visibility
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === "") {
        this.alert = true; // Show custom alert dialog
        return; // Exit the method without adding a task
      }
      this.tasks.push({ text: this.newTask, completed: false, editing: false });
      this.newTask = "";
      this.saveTasks(); // Save updated tasks to localStorage
    },
    editTask(index) {
      this.tasks[index].editing = true;
    },
    updateTask(index) {
      this.tasks[index].editing = false;
      this.saveTasks(); // Save after updating task
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks(); // Save after removing task
    },
    truncateText(text, wordLimit) {
      const words = text.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return text;
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Save tasks to localStorage
    },
  },
  mounted() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks); // Load tasks when the app is mounted
    }
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.cute-text-field input,
.v-btn {
  font-family: cursive;
}

.done {
  text-decoration: line-through;
  color: #888;
}

.v-card {
  border-radius: 20px;
  width: 100%;
}

.v-list-item {
  padding: 0; 
  margin-bottom: 10px;
}

.task-content {
  display: flex;
  align-items: center;
  justify-content: space-between; 
}

.task-details {
  display: flex;
  align-items: center;
  flex: 1; 
  max-width: calc(100% - 150px); 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 8px; 
}

.custom-checkbox .v-input--selection-controls__input {
  background-color: #f7e7a1; 
  border: 2px solid #f7e7a1; 
}

.custom-checkbox .v-input--selection-controls__input:checked {
  background-color: #f7e7a1; 
  border-color: #f7e7a1; 
}

.custom-checkbox .v-input--selection-controls__input .v-icon {
  color: #fff; 
}
</style>
