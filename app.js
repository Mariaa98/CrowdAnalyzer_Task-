const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');
const Feed = require('./feedschema.js');
const validate = require("./helper_functions.js").validate;
const getConversations = require("./helper_functions.js").getConversations;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/crowedDB", {
  useNewUrlParser: true
});
/* This to run local Mongo with docker
mongoose.connect("mongodb://host.docker.internal:27017/crowedDB", {
  useNewUrlParser: true
});
*/
//Here
app.post("/feed", function(req, res) {
  const data = req.body;
  console.log(data);
  if(Object.keys(data.filters).length === 0 || !data.filters ){
    res.status(400).send("We should have at least one filter !");
  }
  const filterValid = validate(data.filters)
  const feed = new Feed({
    name: _.capitalize(data.name),
    filters: filterValid

  });

  feed.save(function(err){
    if(err){

      res.status(400).send(err);
    }else{
      res.send(feed);
      console.log("Saved Succesfully");
    }
  });

});


app.get("/feed/:feedName", function(req, res) {
  const feedName = _.capitalize(req.params.feedName);
  console.log(req.params.feedName);
  Feed.findOne({
    name: feedName
  }, function(err, foundFeed) {
    if (foundFeed) {

      getConversations(foundFeed.filters,res);

    } else {
      res.status(404).send("No Feed Matching This Name");
    }
  });
});


app.listen(process.env.PORT || 3000, HOST, function() {
  console.log("Server is up and running");
})
module.exports = app;
