const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const comments = [
    { id: 1, name: 'Moun isit yo!' },
    { id: 2, name: 'Ala traka papa.' },
    { id: 3, name: 'Men bon jan van.' },
];

app.get('/', (req, res) => {
    res.send('Welcome to the server.');
});

// For all the comments
app.get('/api/comments', (req, res) => {
    res.send(comments);
});

app.post('/api/comments', (req, res) =>{
    const schema = {
        name: Joi.string().min(3).required(),
    }

    const { error } = validateComment(comment, schema);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const comment = { 
        id: comments.length + 1,
        name: req.body.name
     };
     comments.push(comment);
     res.send(comment);
});

app.put('/api/comments/:id', (req, res) => {
    // Look up the comments
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!comment) {
        res.status(404).send("The comment ID was not found.");
    }

    const { error } = validateComment(req.body);
    // If invalid, return 400 - Bad request
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // Update comment
    comment.name = req.body.name;
    // Return the updated comment
    res.send(comment);
});

const validateComment = (comment) => {
  // Validate
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(comment, schema);
};

app.delete('/api/comments/:id', (req, res) => {
    // Look up the comment
    // Not existing, return 404

    // Delete
    // Return the course that we have deleted (By convention)
});


// For single comment
app.get('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send("The comment ID was not found.")
    }
    res.send(comment);
});





const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// To set the environment PORT type the fallowing in the terminal:
// export PORT=5000
// and run your app: nodemon index.js


