import API from '@/services/API'
export default {
  getToDos () {
    return API().get('todo')
  },

  addTodo (todo) {
    return API().post('todo/addTodo', {
      todo: todo // add our data to the request body
    })
  },

  deleteTodo (todoID) {
    return API().post('todo/deleteTodo', {
      todoID: todoID // add our data to the request body
    })
  },

  statusTodo(todoID){
    return API().post('todo/statusTodo', {
      todoID: todoID // add our data to the request body

    })
  }
}