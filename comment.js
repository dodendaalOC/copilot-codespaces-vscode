// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// comment data
const commentData = {
    "1": {
        "name": "Alice",
        "comment": "Hello World"
    }
}

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get('/', (req, res) => {
    res.render('index', {comments: commentData});
});

// Comment post request
app.post('/comment', (req, res) => {
    const commentId = Object.keys(commentData).length + 1;
    const newComment = {
        "name": req.body.name,
        "comment": req.body.comment
    }
    commentData[commentId] = newComment;
    fs.writeFile('commentData.json', JSON.stringify(commentData), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Data saved');
        }
    });
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

/