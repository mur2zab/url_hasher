const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

const UrlSchema = new Schema(
  {
    shortCode: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      trim: true,
      required: true,
    },
    clickCount: {
      type: Number,
      default: 0
    }
  },
  {
    collection: "url",
  }
);

UrlSchema.plugin(timestamps);

UrlSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = mongoose.model("Url", UrlSchema);
