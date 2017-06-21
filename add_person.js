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

let firstName = process.argv.slice(2)[0];
let lastName = process.argv.slice(2)[1];
let dob = process.argv.slice(2)[2];

knex.insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: dob
}).into('famous_people').asCallback((err, results) => {
  if (err) {
    throw err;
  }
  knex.select().from('famous_people').asCallback((err, results) => {
    console.log(results);
    knex.destroy(() => {
      console.log('Connection terminated');
    });
  });
});