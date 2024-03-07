const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  phone: String,
  project: String,
});

const clientModel = mongoose.model("Client", clientSchema);

module.exports = clientModel;
