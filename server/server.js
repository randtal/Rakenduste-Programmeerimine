const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database");
const mongoose = require("mongoose");
require('dotenv').config();
const ItemRouter = require("./item.router.js");
const Item = require("./item.model.js");

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-71tpl.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(ItemRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("/items/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static("dist"));

function listen(){
  // Heroku needs process.env.PORT
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http://localhost:${PORT}`);
  });
}

mongoose.connect(DB_URL)
    .then(() =>{
      console.log("Database access success!");
      migrate();
      listen();
    })
    .catch( err =>{
      console.error("error happened", err);
    });

//siin jäi vigaseks, vide koht 11:11

function migrate(){
    console.log("migrate started!");
    const items = DB.getItems();
    items.forEach(item =>{
        const document = new Item(item);
        document.save( (err) => {
            if(err){
                console.log(err);
                throw new Error("Something happened during save");
            }
            console.log('save success');
        })
    });
    console.log("items", items);
}
