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

  console.log('were here, on message is going');
  if (!this._isFromCookieBot(message) && this._isChannelConversation(message) &&
    this._isMentioningCookies(message)) {
    this._replyWithRandomJoke(message);
  }
    // if (this._isChatMessage(message) &&
    //     this._isChannelConversation(message) &&
    //     !this._isFromCookieBot(message) &&
    //     this._isMentioningCookies(message)
    // ) {
    //   console.log('got through the filtering booleans, a reply should now run');
    //
    // }
};

CookieBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

CookieBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

CookieBot.prototype._isFromCookieBot = function (message) {
    return message.user === this.user.id;
};

CookieBot.prototype._isMentioningCookies = function (message) {
    return message.text.toLowerCase().indexOf('cookies') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

CookieBot.prototype._replyWithRandomJoke = function (originalMessage) {
  console.log('inside _replyWithRandomJoke');
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel('random', 'fuckyou2', {as_user: true});

};

CookieBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};
