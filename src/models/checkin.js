import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';
// Create a new schema for our tweet data
// var connection = mongoose.createConnection("mongodb://localhost:27017/wensu");
// autoIncrement.initialize(connection);

var schema = new mongoose.Schema({
  order: Number,
  person   :Object
},{collection:'checkins'});

// // Create a static getTweets method to return tweet data from the db
// schema.statics.getTweets = function(page, skip, callback) {
//
//   var tweets = [],
//       start = (page * 10) + (skip * 1);
//
//   // Query the db, using skip and limit to achieve page chunks
//   Tweet.find({},'twid active author avatar body date screenname',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs){
//
//     // If everything is cool...
//     if(!err) {
//       tweets = docs;  // We got tweets
//       tweets.forEach(function(tweet){
//         tweet.active = true; // Set them to active
//       });
//     }
//
//     // Pass them back to the specified callback
//     callback(tweets);
//
//   });
//
// };
// schema.plugin(autoIncrement.plugin, {model:'checkins',field:'order',startAt: 1,
//     incrementBy: 1});
// Return a Tweet model based upon the defined schema
module.exports = mongoose.model('checkins', schema);
