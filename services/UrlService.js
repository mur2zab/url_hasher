const { nanoid } = require('nanoid');
const UrlModel = require('../db/models/UrlModel');
const _ = require("lodash")
let serviceInst;

class UrlService {

  incrementClickTrackingCount() {

  }

  async fetchRedirectUrl(params) {
    try {
      let findByObj = { shortCode: params.urlId }
      let urlDetails = await UrlModel.findOneAndUpdate(findByObj,{ $inc: { clickCount: 1 } } );
      if (!urlDetails || _.isEmpty(urlDetails)) {
        throw {
          message: "No url details found"
        }
      }
      return urlDetails.url
    } catch (error) {
      console.log("ERROR in fetching Url details", err)
      throw err;
    }

  }


  async hashUrl(body) {
    try {
      let { url } = body
      let shortCode = nanoid(8);
      let objectToInsert = {
        url,
        shortCode,
        count: 0
      }
      let a = await UrlModel.create(objectToInsert);
      let hashedUrl = "http://localhost:8000/" + shortCode
      return hashedUrl
    } catch (error) {
      console.log(error)
    }
  }
}


module.exports.getInstance = function () {
  if (!serviceInst) {
    serviceInst = new UrlService
  }
  return serviceInst
}
