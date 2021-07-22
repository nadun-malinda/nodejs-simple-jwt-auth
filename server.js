const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const posts = [
    { username: 'Nadun', title: 'My fist post..' },
    { username: 'Rasanga', title: 'My fist post..' },
    { username: 'Sayu', title: 'My fist post..' }
]

// use json in the body
app.use(express.json())

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

// middleware to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    // returns the error and the payload of the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log('in authenticateToken: ', user)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)