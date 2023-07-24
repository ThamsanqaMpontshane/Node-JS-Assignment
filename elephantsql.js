import pg from 'pg';

var conString = "postgres://kvnhtklf:66q4yAJlugL1n6wBjOilngBs3pVxD7lb@dumbo.db.elephantsql.com/kvnhtklf";
 //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});