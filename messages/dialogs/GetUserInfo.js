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

        //make a clone of VERSION and modify it
        let version = Object.assign({}, VERSION);

        if (session.userData.OS == "Windows") {
            version["R2017a"] += " (Recommended)";
            version["R2017b"] += " (Not supporting Windows 8)";
        } else if (session.userData.OS == "MacOS") {
            version["R2017a"] += " (Recommended)";
            version["R2017b"] += " (Not supporting MacOS-X Yosemite";
        } else if (session.userData.OS == "Linux") {
            version["R2017b"] += " (Recommended)";
            version["R2017a"] += " (Not supporting Debian 7";
        }

        version["R2018a"] += " (Beta version)"



        let choiceList = Object.values(version);

        builder.Prompts.choice(session, "What version of matlab are you trying to download?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            session.conversationData["version"] = results.response.entity.split(" ")[0];
            console.log(session.conversationData);
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
        choiceList.push("Not Sure");
        builder.Prompts.choice(session, "What type of license are you trying to get?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            console.log(results.response.entity);
            if (results.response.entity == "Not Sure") {
                next();
            } else {
                session.conversationData.LicenseType = results.response.entity;
                session.save();
                session.conversationData.recognizerEnabled = true;
                session.endDialog();
            }
        }
        next();
    },
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        builder.Prompts.choice(session, "Are you a students, faculty, and staff trying to install on a personal machine or Georgia Tech laptop?", ["Yes", "No"], {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            if (results.response.entity == "Yes") {
                session.conversationData.LicenseType = "Individual";
                session.conversationData.recognizerEnabled = true;
                session.save();
                session.endDialog();
            } else {
                next();
            }
        }
        next();
    },
    (session, args, next) => {
        //temperarily disable luis recognizer so user can decide to type info
        //session.conversationData.recognizerEnabled = false;
        //session.save();
        session.conversationData.recognizerEnabled = false;
        session.save();
        console.log(session.conversationData.recognizerEnabled);
        builder.Prompts.choice(session, "Are you trying to install on a Georgia Tech system such as office desktop, lab workstation, classroom, server or a computer lab", ["Yes", "No"], {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            if (results.response.entity == "Yes") {
                session.conversationData.LicenseType = "Network";
                session.conversationData.recognizerEnabled = true;
                session.save();
            } else {
                session.endConversation("Sorry, Please contact support");
            }
        }
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
        builder.Prompts.choice(session, "Which of the following are you trying to do?", choiceList, {listStyle : builder.ListStyle.button});
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
