const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Feeds API", ()=>{
  /*
  *Test post route
  */
  describe("POST /feed",()=>{
    it("It should POST a new feed and when language is en the dialect ignored to be empty array ",(done)=>{
      const feed = {
        name:"Shopping",
        filters:{
          gender:["male","female"],
          language:["en"],
          dialect:["std"]
        }
      };
      chai.request(server)
      .post("/feed")
      .send(feed)
      .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("name").eq("Shopping");
        response.body.should.have.property("filters");
        response.body.should.have.property('filters').which.is.an('object').and.has.property('gender').with.lengthOf(2);
        response.body.should.have.property('filters').which.is.an('object').and.has.property('language').with.lengthOf(1);
        response.body.should.have.property('filters').which.is.an('object').and.has.property('dialect').with.lengthOf(0);

        done();

      });
    });
  });
  //Second Test case for POST Method
  describe("POST /feed",()=>{
    it("It should POST a new feed and when language and dialect  ",(done)=>{
      const feed = {
        name:"Markting",
        filters:{
          gender:["male","female"],
          language:["en","ar"],
          dialect:["std"]
        }
      };
      chai.request(server)
      .post("/feed")
      .send(feed)
      .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("name").eq("Markting");
        response.body.should.have.property("filters");
        response.body.should.have.property('filters').which.is.an('object').and.has.property('gender').with.lengthOf(2);
        response.body.should.have.property('filters').which.is.an('object').and.has.property('language').with.lengthOf(2);
        response.body.should.have.property('filters').which.is.an('object').and.has.property('dialect').with.lengthOf(1);

        done();

      });
    });
  });
//Third Test case for POST Method
  describe("POST /feed",()=>{
    it("It shouldn't POST a new feed without name property",(done)=>{
      const feed = {
        filters:{
          gender:["male","female"],
          language:"en",
          dialect:"std"
        }
      };
      chai.request(server)
      .post("/feed")
      .send(feed)
      .end((err,response)=>{
        response.should.have.status(400);
        //err.response.body.should.have.property('error');
        done();

      });
    });
  });

//Fourth Test

describe("GET /feed/:feedName",()=>{
  it("It should get  filters by feedName",(done)=>{
    const feedName = "Shopping";
    chai.request(server)
    .get("/feed/"+feedName)
    .end((err,response)=>{
      response.should.have.status(200);
      response.body.should.be.an('array').with.lengthOf(90);
      done();

    });
  });
});
describe("GET /feed/:feedName",()=>{
  it("It should get  filters by feedName",(done)=>{
    const feedName = "Markting";
    chai.request(server)
    .get("/feed/"+feedName)
    .end((err,response)=>{
      response.should.have.status(200);
      response.body.should.be.an('array').with.lengthOf(72);
      done();

    });
  });
});

//Fifth
describe("GET /feed/:feedName",()=>{
  it("It can't get  filters of unsaved feed in DB",(done)=>{
    const feedName = "Maria";
    chai.request(server)
    .get("/feed/"+feedName)
    .end((err,response)=>{
      response.should.have.status(404);
      done();

    });
  });
});

});
