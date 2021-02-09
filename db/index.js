const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

// instantiating new mongo client
const client = new MongoClient(uri, { useUnifiedTopology: true });

const run = async (querryParam, findData) => {
  try {
    await client.connect();
    const database = client.db("myTestDB");
    const collection = database.collection("movies");

    // Querry for dummy data
    const querry = { title: "Interstellar", title: "Pirates of Caribean" };

    /*    
        db.collection.insertMany(
       [ <document 1> , <document 2>, ... ],
       {
          writeConcern: <document>,
          ordered: <boolean>
       }
    )
  */
    if (querryParam) {
      const result = await collection.insertOne(querryParam);
      console.dir(result.insertedCount);
    }

    // find() returns reference to a Cursor with which you can navigate matched documents
    const movie = collection.find(findData).sort({ length: -1 });
    // await movie.forEach((item) => console.log(item));
    await movie.forEach(console.dir);

    // success message
    console.log("DB connection successful");
  } finally {
    // ensuring that all operations run successfully and close DB
    // await client.close();
  }
};

module.exports = run;
