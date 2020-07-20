const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String, default: 'Unknown author' },
    likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
