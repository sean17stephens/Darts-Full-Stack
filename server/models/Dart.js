const mongoose  = require('mongoose');
const validator = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};
const DartSchema  = new mongoose.Schema({

    title: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

    ranking: {
      type      : int,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

    country: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

  }, SchemeConfig);

  module.exports.Dart = mongoose.model('Dart', DartSchema);