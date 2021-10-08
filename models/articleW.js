const mongoose = require('mongoose')

const articleWSchema = mongoose.Schema({
    source: Object,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: String,
})

const articleWModel = mongoose.model('articleW', articleWSchema)

module.exports = articleWModel