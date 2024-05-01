const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017";

const connectToMongo = () => {
    mongoose.connect(mongooseURI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
       
};

module.exports = connectToMongo;
