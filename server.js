const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://vkc140:svy0R17CxhJihQM2@cluster0.lt5be.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000
}).then(() => {
  console.log('MongoDB se successfully connect ho gaya!')
}).catch((err) => {
  console.error('MongoDB connection error:', err)
})

app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)
