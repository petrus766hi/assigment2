const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require ('mongoose');
const connectingURL = 'mongodb+srv://petrus_sigiro:p@ssw0rd@clusterassigment2.gqjsv.mongodb.net/ClusterAssigment2?retryWrites=true&w=majority';
const databaseName = 'Assigment2-DB';

module.exports = function () {
  mongoose.connect (
    connectingURL,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true},
    (error, client) => {
      if (error) {
        return console.log ('DB TIDAK CONNECT');
      }
      console.log ('DB CONNECT');
    }
  );
};
