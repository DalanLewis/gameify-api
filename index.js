const express = require('express')
const bodyParser = require('body-parser')
const db = require('monk')('mongodb://gamemaster:abcxyz123@ds151076.mlab.com:51076/gameifydb')
const userData = db.get('users')
const app = express()
const port = 8888



app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})


app.get('/users', async (req, res) => {
    try {
        const user = await userData.find(req.params._id)
        res.send(user)
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/users', async (req, res) => {
    try {
        await userData.insert(req.body)
        res.send()
    }
    catch (err) {
        console.log(err)
    }
})

app.put('/users/:_id', async (req, res) => {
    try {
        console.log(req.body)
        const stuff = await userData.findOneAndUpdate(req.params._id, req.body)
        res.send(stuff)
    }
    catch (err) {
        console.log(err)
    }
})

app.delete('/users/:_id', async (req, res) => {
    try {
        await userData.findOneAndDelete(req.params._id)
        res.send(stuff)
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(port, () => console.log("i'm listening!"))