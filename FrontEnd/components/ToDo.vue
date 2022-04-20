<template>
  <div v-cloak class="container mx-auto flex items-center flex-col mt-10">
    <header class="text-center">
      <h1 class="text-5xl font-black">To do list</h1>
      <p class="text-xl font-semibold mb-8">
        You have {{ todos.length }} tasks .
      </p>
    </header>

    <main class="mt-3">
      <!-- adding new ToDo -->
      <form v-on:submit="addTodo($event)" class="flex">
        <label for="">
          <input
            id="add_item"
            type="text"
            placeholder="Add task"
            autofocus
            ref="addtask"
            v-model="newTodo"
            class="bg-gray-200 focus:bg-white border-black border-solid border-2 px-2 py-1 w-full mb-4 hover:bg-white"
          />
        </label>
        <button
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 ml-4 px-4 border-b-4 mb-4 border-blue-700 hover:border-blue-500 rounded"
        >
          +
        </button>
      </form>

      <!-- lisitng old ToDos -->
      <ul class="max-w-xl">
        <li
          v-for="(todo, index) in todos"
          :key="index"
          class="my-4 flex items-center justify-between"
        >
          <div  class="my-4  items-center justify-left">
            <input
              class="cursor-pointer"
              type="checkbox"
              @click="changeStatus(todo._id, index)"
              :checked="todo.status"
            />
            <span
              class="px-2 py-1 mr-2 w-40 border-transparent cursor-default"
              :class="{ highlight: todo.status === true }"
            >
              {{ todo.content }}
            </span>
          </div>
          <div class="my-4  items-center justify-right">
            <span class="icon cursor-pointer" @click="deleteTodo(todo._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </span>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import ToDoAPI from "@/services/ToDoAPI.js";

export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      highlighted: false,
    };
  },
  mounted() {
    this.loadTodos();
  },
  methods: {
    //* -----------------------------------------------------------------------------adding new
    async addTodo(evt) {
      evt.preventDefault();
      const response = await ToDoAPI.addTodo(this.newTodo); //!Creation (C of CRUD operation)
      this.todos.push(response.data.savedData); // we are sending the added data as an object with name savedData (chech routes in Backend). hence response.data.savedData
      this.newTodo = ""; //making the variable empty for next addition
    },

    //*--------------------------------------------------------------------------------initialising existing todo list
    async loadTodos() {
      const response = await ToDoAPI.getToDos(); //!Reading (R of CRUD operation)
      this.todos = response.data;
    },

    //*----------------------------------------------------------------------------------Changing Status / Editing the status

    changeStatus(todoID, index) {
      ToDoAPI.statusTodo(todoID); //!Updation (U of CRUD)

      this.todos[index].status = !this.todos[index].status;
    },

    //*-----------------------------------------------------------------------------------Deleting todo
    deleteTodo(todoID) {
      ToDoAPI.deleteTodo(todoID); //!Deletion (D of CRUD)
      this.todos = this.todos.filter(function (obj) {
        return obj._id !== todoID;
      });
    },
  },
};
</script>

//* We are globally using tailwind CSS (instead of bootstrap) in this VueJS
project.

<style>
/* -----------------------------to cross completed tasks--------------------------  */
.highlight,
.highlight_stay {
  color: red;
  text-decoration: line-through;
}

.icon {
  color: #3b82f6;
  outline: none;
  text-decoration: none;
}
.icon:hover {
  color: red;
}
</style>
