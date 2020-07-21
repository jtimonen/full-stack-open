const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String, default: 'Unknown author' },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: '5f174f0ef4c7353e80a184bd'
    }
})

blogSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
