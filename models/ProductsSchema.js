const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: [64, "project name to long"],
    minLength: [2, "project name to short"],
  },
  price: {
    type: Number,
    max: [500, "project price to expensive"],
    min: [0, "project price to cheap"],
  },
  description: {
    type: String,
    minLength: [2, "project name to short"],
  },
  firstImage: {
    type: String,
  },
  secondImage: {
    type: String,
  },
  technologies: {
    type: String,
  },
  category: {
    type: String,
  },
},
{ timestamps: true });

const projectModel = mongoose.model("project", projectSchema)

module.exports = projectModel