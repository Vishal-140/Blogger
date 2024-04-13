const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

// mongoose.connect('mongodb://localhost/VishalBlogWebsiteDatabase')
// const dbUrl = process.env.ATLASDB_URL;
// mongoose.connect(dbUrl)

mongoose.connect('mongodb+srv://vkc140:DuEn4M2nUuk0E3Ps@cluster0.l5s5pvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Any other options you want to add
});

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
