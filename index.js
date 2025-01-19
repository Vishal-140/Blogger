require('dotenv').config()
const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
}).then(() => {
  console.log('MongoDB Connected Successfully')
  // Start server only after DB connection
  const PORT = process.env.PORT || 10000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(err => {
  console.error('MongoDB Connection Error:', err)
})

app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).send('Error loading articles')
  }
})

app.use('/articles', articleRouter)
