// Create web server to handle comments

// Dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Get specific comment
app.get('/comments/:id', function(req, res) {
    var comment = comments[req.params.id];
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// Create new comment
app.post('/comments', function(req, res) {
    var comment = req.body;
    var id = comments.length;
    comment.id = id;
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
        if (err) {
            res.status(500).json({error: 'Failed to save comment'});
        } else {
            res.json(comment);
        }
    });
});

// Update comment
app.put('/comments/:id', function(req, res) {
    var comment = comments[req.params.id];
    if (comment) {
        comment = req.body;
        comments[req.params.id] = comment;
        fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                res.status(500).json({error: 'Failed to save comment'});
            } else {
                res.json(comment);
            }
        });
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// Delete comment
app.delete('/comments/:id', function(req, res) {
    var comment = comments[req.params.id];
    if (comment) {
        comments.splice(req.params.id, 1);
        fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                res.status(500).json({error: 'Failed to save comment'});
            } else {
                res.json({message: 'Comment deleted'});
            }
        });
    } else {
        res.status(404).json({error: 'Comment not found'});
    }
});

// Start server
app.listen(300

