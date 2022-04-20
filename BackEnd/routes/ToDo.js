const express = require('express');
const router = express.Router()
const DB = require('../models/ToDoData');




//!  to read  data from mongo DB
router.get('/', async (req, res) => {

    try {

        const List = await DB.find()
        res.send(List)

    } catch (error) {
        console.log('error')
    }

})

//!  to add  data to mongo DB

router.post('/addToDo', async (req, res) => {

    try {

        var item = {
            content: req.body.todo,
            status: false,
            creation_date: Date.now()
        }


        const ToDoNew = new DB(item)
        const savedData = await ToDoNew.save()

        res.send({ savedData })

    } catch (error) {
        console.log('error')
    }

})

//!  to delete  data from mongo DB

router.post('/deleteTodo', async (req, res) => {

    try {

        let id = req.body.todoID

        const deleteToDo = await DB.findByIdAndDelete({ '_id': id })
        res.send(deleteToDo)

    } catch (error) {
        console.log('error')
    }

})


//!  to edit  data in mongo DB

router.post('/statusTodo', async (req, res) => {

    try {

        let id = req.body.todoID

        DB.findOne({ '_id': id }, async function (err, todo) {
            console.log("todo status before", todo.status)
            todo.status = !todo.status
            const updatedToDo = await todo.save()
            res.send(updatedToDo)

        })

    } catch (error) {
        console.log('error')
    }

})





module.exports = router;