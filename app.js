const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors");
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const testSchema = require("./schema/type_schema")
const app = express(); 

const port = process.env.PORT || 8080;

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema 
}));

mongoose.connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@blog.a5hhehk.mongodb.net/${process.env.mongoDatabase}`,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    console.log(`Connected to ${process.env.mongoDatabase} db`);
    app.listen(port, () => {
        console.log("server started in port: ", port);
    });   
}).catch((e) => {
    console.log("Error::", e);
})


