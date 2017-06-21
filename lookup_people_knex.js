const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.select().from('famous_people').asCallback((err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    knex.destroy(() => {
      console.log('connection terminated');
    });
});