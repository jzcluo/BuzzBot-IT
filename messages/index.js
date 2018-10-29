"use strict";
const builder = require("botbuilder");
const botbuilder_azure = require("botbuilder-azure");
const path = require("path");
//if (process.env.NODE_ENV == "development") {
require("dotenv").config();
//}

var useEmulator = process.env.NODE_ENV == "development";
const Data = require("./dialogs/Data").Data;

var connector = useEmulator
  ? new builder.ChatConnector()
  : new botbuilder_azure.BotServiceConnector({
      appId: process.env["MicrosoftAppId"],
      appPassword: process.env["MicrosoftAppPassword"],
      openIdMetadata: process.env["BotOpenIdMetadata"]
    });

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var documentDbOptions = {
  host: "https://buzzbot-it.documents.azure.com:443/",
  masterKey:
    "7qikuWHAsvahhM4MuknbPrh3BLFYld3luhtFUlkq7VdzSqCBDJC2CXlQ3wAS8NyBUcgK6DZDIvNSzaN3zuIciQ==",
  database: "buzzbot",
  collection: "botdata"
};
var docDbClient = new botbuilder_azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new botbuilder_azure.AzureBotStorage(
  { gzipData: false },
  docDbClient
);

const NoneDialog = require("./dialogs/None");

var bot = new builder.UniversalBot(connector, NoneDialog);
bot.localePath(path.join(__dirname, "./locale"));
bot.set("storage", cosmosStorage);

const recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
recognizer.onEnabled((session, callback) => {
  //Data.recognizerEnabled is a boolean flag
  //that determines whether luis will be used
  if (typeof Data.recognizerEnabled === "undefined") {
    callback(null, true);
  } else if (!Data.recognizerEnabled) {
    callback(null, false);
  } else {
    callback(null, true);
  }
});
bot.recognizer(recognizer);

const ConversationLog = require("./dialogs/Util").ConversationLog;
//set up middleware to intercept messages
bot.use({
  receive: (event, next) => {
    ConversationLog.log += "User : " + event.text + "<br/>";
    next();
  },
  send: (event, next) => {
    if (event.text) {
      ConversationLog.log += "Bot : " + event.text + "<br/>";
    } else {
      //if it is undefined. card message will be added in the card dialog
      //conversationLog += 'Bot : <i>sends card</i><br/>';
    }
    next();
  }
});

if (useEmulator) {
  var restify = require("restify");
  var server = restify.createServer();
  server.listen(3978, function() {
    console.log("test bot endpont at http://localhost:3978/api/messages");
  });
  server.post("/api/messages", connector.listen());
} else {
  module.exports = connector.listen();
}

//These dialogs are difined within the dialogs folder
//const NoneDialog = require('./dialogs/None');
const HiDialog = require("./dialogs/Hi");
const HelpDialog = require("./dialogs/Help");
const BackDialog = require("./dialogs/Back");
const GeorgePBurdellDialog = require("./dialogs/GeorgePDurdell");

//Installation related files
const InstallaionDialog = require("./dialogs/Installation");
const InstallMatlab = require("./dialogs/Installation/InstallMatlab");
const InstallMatlabHelp = require("./dialogs/Installation/InstallMatlabHelp");
const InstallPython = require("./dialogs/Installation/InstallPython");
const InstallJava = require("./dialogs/Installation/InstallJava");

//Licensing related files
const LicensingDialog = require("./dialogs/License");
const NetworkLicense = require("./dialogs/License/NetworkLicense");
const ActivateLicense = require("./dialogs/License/IndividualLicense/ActivateLicense");
const ReactivateExpiredLicense = require("./dialogs/License/IndividualLicense/ReactivateExpiredLicense");
const ReactivateExpiringLicense = require("./dialogs/License/IndividualLicense/ReactivateExpiringLicense");
const DeactivateLicense = require("./dialogs/License/IndividualLicense/DeactivateLicense");
const CreateAccount = require("./dialogs/License/IndividualLicense/CreateMathWorksAccount");

const GetUserInfoDialog = require("./dialogs/GetUserInfo");
const EmailLog = require("./dialogs/Email");

bot.dialog("Email", EmailLog.SendEmail).triggerAction({
  matches: "Debug"
});

bot.dialog("Hi", HiDialog).triggerAction({
  matches: "Hi"
});

//called when a user is added to the conversationUpdate
//https://stackoverflow.com/questions/42353337/is-it-possible-to-detect-when-a-user-opens-the-chat-window-on-facebook/42353957
bot.on("conversationUpdate", message => {
  console.log("conversation updated");
  console.log(message.membersAdded);
  if (
    message.membersAdded &&
    message.membersAdded[0].id === message.address.bot.id
  ) {
    console.log("begining dialog HI");
    bot.beginDialog(message.address, "Hi");
    /*
        let thumbnailCard = new builder.ThumbnailCard()
                            .title('Hi Yellow Jacket')
                            .subtitle('How can I help you today? Please describe your problem.');

        let card = new builder.Message().addAttachment(thumbnailCard).address(message.address);
        bot.send(card);
        */
  }
});

bot.dialog("Back", BackDialog);

bot.dialog("Installation", InstallaionDialog.InstallationDialog).triggerAction({
  matches: "Installation"
});
bot.dialog("Licensing", LicensingDialog.LicensingDialog).triggerAction({
  matches: "Licensing"
});

//licensing steps for network license
bot.dialog("GetNetworkLicense", NetworkLicense.GetNetworkLicense);
bot.dialog("ActivateLicense", ActivateLicense.ActivateLicense);
bot.dialog("DeactivateLicense", DeactivateLicense.DeactivateLicense);
bot.dialog(
  "ReactivateExpiredLicense",
  ReactivateExpiredLicense.ReactivateExpiredLicense
);
bot.dialog(
  "ReactivateExpiringLicense",
  ReactivateExpiringLicense.ReactivateExpiringLicense
);

//steps for creating mathworks account
bot.dialog("CreateAccount", CreateAccount.CreateAccount).triggerAction({
  matches: "CreateAccount"
});

//installation steps for matlab
bot.dialog("InstallMatlab", InstallMatlab.InstallMatlab);
bot.dialog("InstallMatlab_Mac", InstallMatlab.InstallMatlab_Mac);
//begin dialog action https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-dialog-actions
bot
  .dialog("InstallMatlab_Windows", InstallMatlab.InstallMatlab_Windows)
  .beginDialogAction("InstallMatlabHelpAction", "InstallMatlabHelp_Windows", {
    matches: "Help"
  })
  .beginDialogAction("InstallMatlabBackAction", "Back", {
    matches: "Back"
  });

bot.dialog("InstallMatlab_Linux", InstallMatlab.InstallMatlab_Linux);

bot.dialog(
  "InstallMatlabHelp_Windows",
  InstallMatlabHelp.InstallMatlabHelp_Windows
);

//installation steps for python
bot.dialog("InstallPython", InstallPython.InstallPython);
bot.dialog("InstallPython_Mac", InstallPython.InstallPython_Mac);
bot.dialog("InstallPython_Windows", InstallPython.InstallPython_Windows);
bot.dialog("InstallPython_Linux", InstallPython.InstallPython_Linux);

//installation steps for java
bot.dialog("InstallJava", InstallJava.InstallJava);
bot.dialog("InstallJava_Mac", InstallJava.InstallJava_Mac);
bot.dialog("InstallJava_Windows", InstallJava.InstallJava_Windows);
bot.dialog("InstallJava_Linux", InstallJava.InstallJava_Linux);

//dialogs used to get user's information
bot.dialog("GetSoftwareInfo", GetUserInfoDialog.GetSoftwareInfo);
bot.dialog("GetOSInfo", GetUserInfoDialog.GetOSInfo);
bot.dialog("GetVersionInfo", GetUserInfoDialog.GetVersionInfo);
bot.dialog("GetLicenseType", GetUserInfoDialog.GetLicenseType);
bot.dialog("GetLicenseAction", GetUserInfoDialog.GetLicenseAction);
bot.dialog("WhetherLicenseExpired", GetUserInfoDialog.WhetherLicenseExpired);

bot.dialog("Help", HelpDialog).triggerAction({
  matches: "Help"
});

bot.dialog("GeorgePBurdell", GeorgePBurdellDialog).triggerAction({
  matches: "George"
});

//cancel dialog that returns to the dialog before current dialog
bot
  .dialog("Cancel", [
    session => {
      //these two fields will be defined in every dialog
      //when user wants to cancel their currentDialog
      //start the last dialog
      session.cancelDialog(0, "Hi"); //later the second parameter could be replaced with Data.lastDialog
    }
  ])
  .triggerAction({
    matches: "Cancel"
  });
