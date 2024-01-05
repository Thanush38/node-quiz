const express = require('express');
const path = require('path');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Thanush38:Codingkobz3@cluster0.nd7iykw.mongodb.net/?retryWrites=true&w=majority";
let scores = [];

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  console.log("run function");
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("quiz");
    let collection = database.collection("easy");
    

    await client.db("quiz").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const options = {
        // sort matched documents in descending order by rating
        sort: { score: -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { _id: 0, name: 1, score: 1 },
        };

    
    let cursor = collection.find();
    console.log("after");
    scores = [];
    easy = [];
    for await (const doc of cursor) {
        easy.push(doc);
    }
    easy.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scores.push(easy);
    console.log("after easy scores")

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
    console.log("after adding scores")





  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed connection in finally run")
  }
}
run().catch(console.dir);
console.log("connected");





const  postData = async (name, score, level) => {
  try {
      await client.connect();
      const database = client.db("quiz");
      console.log("before collection")
      const collection = database.collection(level);
      console.log("after collection")
      const doc = { username:name, score:score  };
      const result = await collection.insertOne(doc);
      console.log("after result")
      console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
      console.log("after result log")
  } finally {
    await client.close();
    run().catch(console.dir);
    
  }
}



const router = express.Router();

router.get('/highscores', (req, res,next) => {
    run().catch(console.dir);
    res.render('highscores', {
      easy: scores[0],
      medium: scores[1],
      hard: scores[2]
    });
    }
);
router.post('/highscores', (req, res,next) => {
    console.log(req.body.username);
    console.log(req.body.level)
    
    postData(req.body.username, req.body.score, req.body.level).catch(console.dir);
    res.redirect('/highscores');
    }
);



module.exports = router;