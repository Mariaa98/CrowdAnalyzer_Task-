// credit goes to this stack overflow post - http://stackoverflow.com/questions/20646836/is-there-any-way-to-import-a-json-filecontains-100-documents-in-elasticsearch
var elasticsearch = require('elasticsearch'),
    fs = require('fs'),
    conversations = JSON.parse(fs.readFileSync(__dirname + '\\conversations.json')); // name of my first file to parse
var client = new elasticsearch.Client({  // default is fine for me, change as you see fit
  host: 'localhost:9200',
  log: 'trace'
});

for (var i = 0; i < conversations.length; i++ ) {
  client.create({
    index: "conversations", // name your index
    type: "docs", // describe the data thats getting created
    id: i, // increment ID every iteration - I already sorted mine but not a requirement
    body:conversations[i] // *** THIS ASSUMES YOUR DATA FILE IS FORMATTED LIKE SO: [{prop: val, prop2: val2}, {prop:...}, {prop:...}] - I converted mine from a CSV so pubs[i] is the current object {prop:..., prop2:...}
  }, function(error, response) {
    if (error) {
      console.error(error);
      return;
    }
    else {
    console.log(response);
    }
  });
}
