const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('data', function (req, res) {
    var out = ' '
    if(req.method === 'POST'){
        out = JSON.stringify(req.body)
    }
    return out 
})


app.use(morgan(':method :url :status - :response-time ms :data'))

let persons = [
    { id: 1, name: "Seppo Kauranen", number: "123-123-123" },
    { id: 2, name: "Mary Poppendieck", number: "044-32-22200" },
    { id: 3, name: "Juho Timonen", number: "20-12-3253" }
]

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello Worldd!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const n = persons.length
    let content = '<h1>Info</h1>'
    content += `<p>The phonebook has info about ${n} persons.<p>`
    content += '<p>' + (new Date()).toString() + '<p>'
    res.send(content)
})


// GET
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

// POST
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) { return response.status(400).json({error: 'name missing'}) }
    if (!body.number) { return response.status(400).json({error: 'number missing'}) }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    const sameName = persons.filter(person => person.name === newPerson.name)
    if(sameName.length > 0){ return response.status(400).json({error: 'name already in phonebook!'}) }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

// LISTEN
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

