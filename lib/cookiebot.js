'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var CookieBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'cookiebot';

    this.user = null;

    console.log('CookieBot Constructor has been called and completed');
};

// inherits methods and properties from the Bot constructor
util.inherits(CookieBot, Bot);

module.exports = CookieBot;

CookieBot.prototype.run = function () {
    CookieBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);

    console.log('Cookiebot.prototype.run has been called and completed');
};


CookieBot.prototype._onStart = function () {
  console.log('now onstart');
    this._loadBotUser();
  //  this._connectDb();
    this._firstRunCheck();
};

CookieBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
    console.log('laodbotuser');
};

CookieBot.prototype._connectDb = function () {
    // if (!fs.existsSync(this.dbPath)) {
    //     console.error('Database path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
    //     process.exit(1);
    // }
    //
    // this.db = new SQLite.Database(this.dbPath);
};

CookieBot.prototype._firstRunCheck = function () {
     var self = this;
     self._welcomeMessage();
};

CookieBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, nvoke me!',
        {as_user: true});
        console.log('welcome msg done');
};

CookieBot.prototype._onMessage = function (message) {

  // this.postMessageToChannel('bottest', 'hi there').then(function(data) {
  //   console.log('HELLLLOO--' + data);
  // });
  console.log('were here, on message is going');
  if (!this._isFromCookieBot(message) && true && //this._isChannelConversation(message) &&
    this._isMentioningCookies(message) && this._isChatMessage(message)) {

      //so remember, private channels in Slack are considered Groups. Hence checking for 'G' in _isChannelConversation
      var self = this;
      self.postMessageToGroup('bottest', 'hi there', {as_user: true}).then(function(data) {
         console.log('YUPPPP-' + data);
       });
  }
};


CookieBot.prototype._isChatMessage = function (message) {

  var bool = message.type === 'message' && Boolean(message.text);
  console.log('_isChatMessage = ' + bool);
    return bool;
};

CookieBot.prototype._isChannelConversation = function (message) {

  var bool = typeof message.channel === 'string' && message.channel[0] === 'G';
  console.log('_isChannelConversation = ' + bool);
    return bool;
};

CookieBot.prototype._isFromCookieBot = function (message) {
  var bool = message.user === this.user.id;
  console.log('_isFromCookieBot ' + bool);
    return bool;
};

CookieBot.prototype._isMentioningCookies = function (message) {
  var bool = message.text.toLowerCase().indexOf('cookies') > -1 ||
      message.text.toLowerCase().indexOf(this.name) > -1;
      console.log('_isMentioningCookies = ' + bool);
    return bool;
};

CookieBot.prototype._replyWithRandomJoke = function (originalMessage) {
  console.log('inside _replyWithRandomJoke');
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel('bottest', 'Hello', {as_user: true});

};

CookieBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};
