var fs = require("fs");
var path = require("path");

module.exports = function load(app) {

  function loadAPIModule(filepath) {
    const http_methods = ['all', 'get', 'post', 'put', 'delete']
    var mappings = require(filepath);
    
    for(route in mappings){    
      if (http_methods.indexOf(mappings[route].method)) {
        mappings[route].handler = Array.isArray(mappings[route].handler) ? mappings[route].handler : [mappings[route].handler]
         app[mappings[route].method](route,mappings[route].handler)
      }
    }
  }

  try {
    var files = fs.readdirSync(__dirname);

    files.forEach(function (file) {
    if ([".", "..", "index.js"].indexOf(file) > -1) {
      return;
    }
      var filePath = path.join(__dirname, file);
      var pathStat = fs.statSync(filePath);
      if (pathStat.isFile() && file.substr(-3) === ".js") {
        loadAPIModule(filePath);
      }
    });
  } catch (err) {
    console.log("APILoader Fatal error, unable to load rest apis", err && err.stack);
    throw err;
  }

}
