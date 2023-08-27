const mongoose = require("mongoose")
const { Schema } = mongoose;

const hobbySchema = new Schema({
    title: {type: String},
    description: {type: String},
    userId: {type: String}
});

module.exports = mongoose.model("Hobby", hobbySchema);
