const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

// instantiating new mongo client
const client = new MongoClient(uri, { useUnifiedTopology: true });

const run = async () => {
  try {
    await client.connect();
    const database = client.db("myTestDB");
    const collection = database.collection("movies");

    // Querry for dummy data
    const querry = { title: "Interstellar", title: "Pirates of Caribean" };
    collection.insertMany([
      { title: "Interstellar", cast: ["actor 1", "actor 2", "actor 3"] },
      {
        title: "Pirates of Caribbean",
        cast: ["actor 1", "actor 2", "actor 3", "actor 4", "actor 5"],
      },
    ]);
    const movie = await collection.findOne({ title: "Interstellar" });
    console.log(movie);

    // success message
    console.log("DB connection successful");
  } finally {
    // ensuring that all operations run successfully and close DB
    // await client.close();
  }
};

module.exports = run;
