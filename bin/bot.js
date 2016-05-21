'use strict';

var CookieBot = require('../lib/cookiebot');

var token = 'xoxb-44795358374-nyp4eOSMDBs0JU5AlWi4ymKs';
//var dbPath = process.env.BOT_DB_PATH;
var name = 'cookiebot';

var cookiebot = new CookieBot({
    token: token,
    name: name
  //  dbPath: dbPath,

});

console.log('bot.js has been ran.');

console.log('cookiebot.run inside bot.js is about to begin');
cookiebot.run();
