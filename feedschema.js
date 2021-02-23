const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  filters: {
    gender: {
      type: [String],
      enum: ['male', 'female', 'virtual'],
      required:function() {
      return   !this.filters.dialect && !this.filters.language && !this.filters.followers_count_range
    }

    },
    dialect: {
      type: [String],
      enum: ['gf', 'std', 'egy'],
      required:function() {
      return !this.filters.gender  && !this.filters.language && !this.filters.followers_count_range
    }
    },
    language: {
      type: [String],
      enum: ['ar', 'en'],
      required:function() {
      return !this.filters.gender && !this.filters.dialect  && !this.filters.followers_count_range
    }
    },
    followers_count_range: {
      gte:{
        type:Number,

        required:function() {
        return !this.filters.gender && !this.filters.dialect && !this.filters.language
      }
      },
      lte: {
        type:Number,

        required:function() {
        return !this.filters.gender && !this.filters.dialect && !this.filters.language
      }
      }

    }
  }
});

module.exports = mongoose.model("Feed", feedSchema);
