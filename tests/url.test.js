let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
const { expect } = chai
chai.use(chaiHttp);
let server, hashedCode, redirectUrl = "http://www.google.com/";

describe('Hash URL', function () {
  this.timeout(60000);
  before(async function () {
    server = await require("../index");
  })

  it("Hashing URL", async function () {
    let request = await chai.request("http://localhost:8000")
      .post('/hashUrl')
      .type('application/json')
      .send({
        url: redirectUrl
      });

    request.should.have.status(200);

    const requestJSON = JSON.parse(request.text);
    expect(requestJSON).to.have.property('success', true);
    expect(requestJSON).to.have.a.property('hashedUrl');
    if (requestJSON.hashedUrl) {
      const splitString = requestJSON.hashedUrl.split('/')
      const shortCode = splitString[splitString.length - 1];
      hashedCode = shortCode;
      const UrlModel = require("../db/models/UrlModel");
      let data = await UrlModel.findOne({ shortCode: shortCode })
      expect(data).to.be.an('object').that.is.not.empty;
    }

  });


  it("Fetching Redirect URL from hashed URL ", function () {
    return chai.request("http://localhost:8000")
      .get(`/${hashedCode}`)
      .then(res => {
        return expect(res)
          .to.redirectTo(redirectUrl)
      })
  })

});
