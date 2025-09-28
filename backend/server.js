const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config(); 

const Post = require('./postModel.js');

const app = express(); 
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI; 
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find(); 
        res.json(posts);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});