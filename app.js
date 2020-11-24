const express = require('express');
const Blog = require('./models/blog');
require('./db/mongoose');

const testRouter = require('./routers/blog');
const port = process.env.PORT || 3000;

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use('/static', express.static(__dirname + '/public'));

app.use(express.urlencoded({
  extended: true
}))


app.get('/',  async (req, res) => {
  console.log(`Estamos en Bievendido`);
  res.render('index', { title: 'Bienvenido'});
});

app.get('/blog', async (req, res) => {
  console.log(`Estamos en Blog`);
  try {
    const blogs = await Blog.find({})
    res.render('blog', { title: 'Blog' , blogs});
  } catch (error) {
    res.render('blog', { title: 'Blog' , blogs: [] });
  }
});

app.get('/post/:id', async (req, res) => {
  console.log(`Estamos en Post`);
  try {
    const post = await Blog.findById(req.params.id)
    res.render('post', { title: 'Post' , post});
  } catch (error) {
    res.render('post', { title: 'Post' , post: {} });
  }
});

app.use(express.json());
app.use('/api', testRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

