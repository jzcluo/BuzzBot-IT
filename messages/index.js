"use strict";
const builder = require("botbuilder");
const botbuilder_azure = require("botbuilder-azure");
const path = require('path');
require('dotenv').config();
//These dialogs are difined within the dialogs folder
const HiDialog = require('./dialogs/Hi');
const InstallaionDialog = require('./dialogs/Installation');
const GetUserInfoDialog = require('./dialogs/GetUserInfo');


const useEmulator = (process.env.NODE_ENV == 'development');

const connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

const bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));

const recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
recognizer.onEnabled((session, callback) => {
    if (typeof session.conversationData.recognizerEnabled === 'undefined') {
        callback(null, true);
    } else if (!session.conversationData.recognizerEnabled) {
        callback(null, false);
    } else {
        callback(null, true);
    }
});
bot.recognizer(recognizer);


//called when a user is added to the conversationUpdate
//https://stackoverflow.com/questions/42353337/is-it-possible-to-detect-when-a-user-opens-the-chat-window-on-facebook/42353957
bot.on('conversationUpdate', (message) => {
    console.log(message.membersAdded);
    if (message.membersAdded && message.membersAdded[0].id === message.address.bot.id) {
        bot.beginDialog(message.address, 'Hi');
    }
});

bot.dialog('/', function (session) {
    session.send('You said ' + session.message.text);
});

bot.dialog('Hi', HiDialog).triggerAction({
    matches : 'Hi'
});
bot.dialog("GetUserInfo", InstallaionDialog.ExtractUserInfo).triggerAction({
    matches : 'Installation'
});
bot.dialog("InstallMatlab", InstallaionDialog.InstallMatlab);

//dialogs used to get user's information
bot.dialog("GetSoftwareInfo", GetUserInfoDialog.GetSoftwareInfo);
bot.dialog("GetOSInfo", GetUserInfoDialog.GetOSInfo);



if (useEmulator) {
    const restify = require('restify');
    const server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());
} else {
    module.exports = { default: connector.listen() }
}
