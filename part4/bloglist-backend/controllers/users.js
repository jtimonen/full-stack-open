const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (_, response) => {
    const users = await User.find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 3) {
        response.status(400).json({ error: 'Password is too short' })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        if (savedUser) {
            response.json(savedUser)
        } else {
            response.status(400).end()
        }
    }

})

module.exports = usersRouter
