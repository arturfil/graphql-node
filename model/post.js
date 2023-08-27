const mongoose = require("mongoose")
const { Schema } = mongoose;

const postSchema = new Schema({
    comment: {type: String},
    userId: {type: String}
});

module.exports = mongoose.model("Post", postSchema);
