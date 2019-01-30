const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()



mongoose.connect('mongodb://localhost:27017/testdb')


app.use(cors())
app.use(bodyParser.json())



let bookSchema = mongoose.Schema({
    name: String
})

let Books = mongoose.model('Books', bookSchema)

















// get all books
app.get('/api/books', (req, res) => {
    Books.find({}, (err, data) => {
        res.json(data)
    })
})

// get single book
app.get('/api/book/:id', (req, res) => {
    Books.findOne({ _id: req.params.id }, (err, data) => {
        res.json(data)
    })
})


// add single book
app.post('/api/book', (req, res) => {
    let newBook = new Books(req.body)

    newBook.save(err => {
        if (err) console.log(err)
        res.sendStatus(200);
    }
    )
})

//update book
app.put('/api/book/:id', (req, res) => {
    Books.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
        res.sendStatus(200)
    })
})

// delete book
app.delete('/api/book/:id', (req, res) => {
    Books.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) console.log(err)
        res.sendStatus(200)
    })
})

app.listen(3000)