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
    const collection = database.collection("highscores");
    console.log("before");
    console.log(collection);
    const query = { name: "thanush" };

   
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

    
    const cursor = collection.find();
    console.log("after");
    if((await collection.countDocuments(query)) === 0) {
        console.log("No documents found!");
    }
    scores = [];
    for await (const doc of cursor) {
        scores.push(doc);
        console.log(doc);
    }

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
    res.render('highscores', {scores: scores});
    }
);
router.post('/highscores', (req, res,next) => {
    console.log(req.body.username);
    postData(req.body.username, req.body.score);
    res.redirect('/highscores');
    }
);



module.exports = router;