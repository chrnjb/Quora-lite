const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username : "apna college",
        content : "I love learning new things!" 
    },
    {
        id: uuidv4(),
        username : "chiranjib",
        content : "Express.js is awesome!" 
    },
    {
        id: uuidv4(),
        username : "Karan",
        content : "EJS makes templating so easy!" 
    },
    {
        id: uuidv4(),
        username : "Karan Aujla",
        content : "Courtside out now! Checkout on Yt, Spotify and Apple Music" 
    }
];

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts'); // by default it will redirect to the GET /posts route
});

app.get('/posts/:id', (req, res) => {
     let {id} = req.params;
     let post = posts.find(post => post.id === id);
     res.render("show.ejs", { post });
});

app.patch('/posts/:id', (req, res) => {
     let {id} = req.params;
     let newContent = req.body.content;
     let post = posts.find(post => post.id === id);
     post.content = newContent;
     console.log(id);
     res.redirect("/posts"); 
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find(post => post.id === id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost: ${port}`);
});
