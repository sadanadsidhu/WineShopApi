const { MongoClient } = require("mongodb");
const WebSocket = require("ws");
const dotenv = require('dotenv');

dotenv.config();

const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT });

wss.on("connection", (ws) => {
  console.log("Client connected");
});

async function createChangeStream() {
  const uri = process.env.MONGODB_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("winecollection");
    
    const collections = [
      "addtocarts",
      "alladdcarts",
      "allcustomerandproductdatas",
      "allcustomerandproductdetails",
      "categories",
      "customeraadhadetails",
      "customeraddresses",
      "customerdetails",
      "customers",
      "otps",
      "pancarddetails",
      "payments",
      "subwinecategories",
      "swiperimages",
      "userselfies",
      "wineshops"
    ];

    collections.forEach((collectionName) => {
      const collection = database.collection(collectionName);
      const changeStream = collection.watch();

      changeStream.on("change", (change) => {
        console.log(`Change in collection ${collectionName}:`, change);
        // Now broadcast 'change' to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(change));
          }
        });
      });
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

createChangeStream().catch(console.error);

module.exports = { createChangeStream, wss };
