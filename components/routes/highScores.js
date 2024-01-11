const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
//enable .env file to store sensitive data
require('dotenv').config();
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/quiz";
//scores variable to store the scores from the database
let scores = [];

// Creates a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//async function to get the scores from the database and store them in the scores variable
async function run() {
  try {
    await client.connect();
    const database = client.db("quiz");
    let collection = database.collection("easy");
    let cursor = collection.find();
    scores = [];
    easy = [];
    for await (const doc of cursor) {
        easy.push(doc);
    }
    easy.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scores.push(easy);

    collection = database.collection("medium");
    cursor = collection.find();
    medium = [];
    for await (const doc of cursor) {
        medium.push(doc);
    }
    medium.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scores.push(medium);

    collection = database.collection("hard");
    cursor = collection.find();
    hard = [];
    for await (const doc of cursor) {
        hard.push(doc);
    }
    hard.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scores.push(hard);





  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




//async function to post the scores to the database
const  postData = async (name, score, level) => {
  try {
      await client.connect();
      const database = client.db("quiz");
      const collection = database.collection(level);
      const doc = { username:name, score:score  };
      await collection.insertOne(doc);
      
  } finally {
    await client.close();
    
  }
}



const router = express.Router();

// sends the highscores page
router.get('/highscores', async (req, res,next) => {
    await run().catch(console.dir);
    res.render('highscores', {
      easy: scores[0],
      medium: scores[1],
      hard: scores[2]
    });
    }
);
// posts the scores to the database and redirects to the highscores page
router.post('/highscores', async (req, res,next) => {
    
    await postData(req.body.username, req.body.score, req.body.level).catch(console.dir);
    res.redirect('/highscores');
    }
);



module.exports = router;