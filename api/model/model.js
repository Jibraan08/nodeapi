const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const someModelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image:{
    type: String
  }
  
});
const someModel = mongoose.model("someModel", someModelSchema);
module.exports= someModel;
