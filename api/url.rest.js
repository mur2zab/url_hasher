const urlServiceInst = require("../services/UrlService").getInstance();
var {isHttpUri, isHttpsUri} = require('valid-url');

async function urlRedirectHandler(req, res) {
  try {
    let originalUrl = await urlServiceInst.fetchRedirectUrl(req.params);
    console.log("urlRedirectHandler -> originalUrl", originalUrl)
    res.redirect(originalUrl);
  }catch(error){
    res.status(400).send(error)
  }
}

function validateUrl(uri){
  console.log("validateUrl -> isHttpUri(uri)", isHttpUri(uri))
  console.log("validateUrl -> isHttpsUri(uri)", isHttpsUri(uri))
  if(!isHttpUri(uri) && !isHttpsUri(uri)){
    throw "Invalid URL"
  }
  return true;
}

async function hashUrlHandler(req,res){
  try{
    let { body } = req;
    let uri = req.body && req.body.url;
    validateUrl(uri)
    let hashedUrl = await urlServiceInst.hashUrl(body);
    console.log("hashUrlHandler -> hashedUrl", hashedUrl)
    res.status(200).send({
      success: true,
      hashedUrl
    })
  }catch(error){
    res.status(500).send(error)
  }
}


module.exports = {
  "/:urlId": {
    method: "get",
    handler: [urlRedirectHandler]
  },

  "/hashUrl": {
    method: "post",
    handler: [hashUrlHandler]
  }
}