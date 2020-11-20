module.exports = {


    "app": {
        "PORT": process.env.PORT || 8000
    },

    "db": {
        "MONGODB_URI": process.env.MONGODB_URI || "mongodb://localhost:27017/urlshortner",
        "RECONNECT_TRIES": process.env.RECONNECT_TRIES || 3,
        "RECONNECT_DELAY":process.env.RECONNECT_DELAY || 500
    }

}