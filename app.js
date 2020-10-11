const express = require ('express');
const bp = require ('body-parser');
const port = 5000;
const app = express ();
const Regis = require ('./router/Register');
const Logins = require ('./router/Login');
const Market = require('./router/MarketRoute')
const Resource = require('./router/GetResource')
const mongoDbConnection = require ('./db/mongoDB.js');
const Farm = require('./router/FarmRoute')
const Barrack = require('./router/BarrackRoute')
const Attack = require('./router/AttackRoute')
mongoDbConnection ();
app.use (bp.urlencoded ({extended: false}));
app.use (bp.json ());
app.use (require ('morgan') ('dev'));
app.use (express.json ());
// cron.schedule('* * * * * *', function() {
//   console.log('Running task every second');
// });

app.use (Regis);
app.use (Logins);
app.use (Market);
app.use (Resource);
app.use (Farm);
app.use (Barrack);
app.use (Attack);

app.listen (port, () => {
  console.log ('Express server listning on port ' + port);
});
