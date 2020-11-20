process.env.PORT= 8000
process.env.MONGODB_URI = "mongodb://localhost:27017/urlshortner"

require("./tests/url.test")
