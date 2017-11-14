"use strict";
const builder = require("botbuilder");
const botbuilder_azure = require("botbuilder-azure");
const path = require('path');
require('dotenv').config();
//These dialogs are difined within the dialogs folder
const HiDialog = require('./dialogs/Hi');
const InstallaionDialog = require('./dialogs/Installation');


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
bot.recognizer(recognizer);

bot.dialog('/', function (session) {
    session.send('You said ' + session.message.text);
});

bot.dialog('Hi', HiDialog).triggerAction({
    matches : 'Hi'
});
bot.dialog("Installation", InstallaionDialog).triggerAction({
    matches : 'Installation'
});



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
