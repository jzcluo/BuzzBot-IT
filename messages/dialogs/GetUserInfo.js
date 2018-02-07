const builder = require('botbuilder');
const GetClosestMatch = require('./Util').GetClosestMatch;
const SOFTWARE = require('./Enums').SOFTWARE;
const OS = require('./Enums').OPERATINGSYSTEM;
const VERSION = require('./Enums').VERSION;
const LICENSETYPE = require('./Enums').LICENSETYPE;
const LICENSEACTION = require('./Enums').LICENSEACTION;

module.exports.GetSoftwareInfo = [
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        //list of software names
        let choiceList = Object.keys(SOFTWARE);
        //add in the option of other
        choiceList.push("Other");
        builder.Prompts.choice(session, "What software are you installing?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            if (results.response.entity == "Other") {
                //if user selects other, prompt them to type in the software they are looking for
                builder.Prompts.text(session, "Please type the name of the software you are looking for");
            } else {
                //this should be a conversation data as it could be a different software in next interaction
                session.conversationData.software = results.response.entity;
                //reenable luis recognizer
                session.conversationData.recognizerEnabled = true;
                session.save();
                session.endDialog();
            }
        }
    },
    (session, results) => {
        if (results.response) {
            //if user chooses to type in a name for software
            session.conversationData.software = GetClosestMatch(Object.keys(SOFTWARE), results.response);
            //reenable luis recognizer
            session.conversationData.recognizerEnabled = true;
            session.save();
        }
        session.endDialog();
    }
]


module.exports.GetOSInfo = [
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        let choiceList = Object.keys(OS);
        builder.Prompts.choice(session, "What operating system are you using?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            session.userData.OS = results.response.entity;
            session.save();
        }
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.endDialog();
    }
]

module.exports.GetVersionInfo = [
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        let choiceList = Object.keys(VERSION);
        builder.Prompts.choice(session, "What version of matlab are you trying to download?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            session.conversationData["version"] = results.response.entity;
            session.save();
        }
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.endDialog();
    }
]

module.exports.GetLicenseType = [
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        let choiceList = Object.keys(LICENSETYPE);
        builder.Prompts.choice(session, "What type of license are you trying to get?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            session.conversationData.LicenseType = results.response.entity;
            session.save();
        }
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.endDialog();
    }
]

module.exports.GetLicenseAction = [
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        let choiceList = Object.keys(LICENSEACTION);
        builder.Prompts.choice(session, "Which of the following are you tryign to do?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            session.conversationData.LicenseAction = results.response.entity;
            session.save();
        }
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.endDialog();
    }
]

module.exports.WhetherLicenseExpired = [
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        let choiceList = ["Yes", "No"];
        builder.Prompts.choice(session, "If your license currently expired?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            session.conversationData.LicenseExpired = results.response.entity;
            session.save();
        }
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.endDialog();
    }
]
