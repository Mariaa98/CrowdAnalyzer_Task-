const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: "localhost:9200"
});
function validate(data){
  let langstatus = false;

const filter ={};
if(data.gender){
  filter['gender'] = data.gender;
}
if(data.language){
    filter['language'] = data.language;
    if(data.language.length == 1 && data.language.includes('en')){
      langstatus=true;
    }

}
if(data.dialect){
  if(!langstatus){
    filter['dialect'] = data.dialect;
  }
}
if(data.followers_count_range){
  filter['followers_count_range'] = data.followers_count_range;
}
//console.log("This is my filter obj");
//console.log(filter);
return filter;
}

function getConversations(filter,res){
  const resultconv = [];
  client.search({
    index: "conversations",
    type: "docs",
    size:300,
    body: {
      query: {
    bool: {
      should: [
        {
          range: {
            followers_count: {
              gte: filter.followers_count_range.gte,
              lte: filter.followers_count_range.lte
            }
          }
        },
        filter.gender
          ? {
              "terms": {
                user_gender: filter.gender

              }
            }
         : {
             match_all: {}
         },
        filter.dialect
          ? {
              "terms": {
                dialect: filter.dialect
              }
            }
          : {
              match_all: {}
            },
        filter.language
          ? {
              "terms": {
                lang: filter.language
              }
            }
          : { match_all: {} }
      ],

      minimum_should_match: 1
    }
  }

    }

  }, function(err, resp, status) {
    if (err) {
      console.log(err);
      res.status(400).send({
        message: "Not Found"
      });
    } else {
      //console.log("--- Response ---");
      console.log(resp);
      console.log("--- Hits ---");
      resp.hits.hits.forEach(function(hit) {
        console.log(hit._source);
        resultconv.push(hit._source);
      });
      /*res.status(200).send({
        message: "Done"
      });*/
      res.send(resultconv);
    }
  });
}

module.exports = {
 validate:validate,
 getConversations:getConversations
};
