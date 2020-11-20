/*
    All the initializations goes here
*/

function initializeAPIs(app){
    return require("./api")(app)
}


function initializeDb(){
    return require("./db");
}


module.exports = {
    initializeAPIs,
    initializeDb
}