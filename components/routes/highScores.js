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
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("quiz");
    let collection = database.collection("easy");
    

   
    // print a message if no documents were found
    // if ((await cursor.countDocument()) === 0) {
    //     console.log("No documents found!");
    // }


    //ping the database
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
    scores.push(easy);

    collection = database.collection("medium");
    cursor = collection.find();
    medium = [];
    for await (const doc of cursor) {
        medium.push(doc);
    }
    scores.push(medium);

    collection = database.collection("hard");
    cursor = collection.find();
    hard = [];
    for await (const doc of cursor) {
        hard.push(doc);
    }
    scores.push(hard);
    console.log(scores);





  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
console.log("connected");

const  postData = async (name, score) => {
    try {
        await client.connect();
        await client.db("quiz").command({ ping: 1 });
        const database = client.db("quiz");
        const collection = database.collection("highscores");
        const doc = { username:name, score:score  };
        const result = await collection.insertOne(doc);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
    } finally {
        await client.close();
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
    let level = req.query.level;
    console.log(level);
    postData(req.body.username, req.body.score);
    res.redirect('/highscores');
    }
);



module.exports = router;