const builder = require('botbuilder');
const SOFTWARE = require('./Enums').SOFTWARE;
const OS = require('./Enums').OPERATINGSYSTEM;

const Levenshtein_Distance = require('./Util').Levenshtein_Distance;
const GetClosestMatch = require('./Util').GetClosestMatch;

const Data = require('./Data').Data;


const InstallationDialogs = {
    [SOFTWARE.Matlab] : "InstallMatlab",
    [SOFTWARE.Python] : "InstallPython",
    [SOFTWARE.Java] : "InstallJava"
};

module.exports.InstallationDialog = [
    (session, args, next) => {

        //args contain the entities LUIS extracted
        //If there is at least one entity, args would be defined
        console.log(args);
        if (args) {
            //args.intent.entities is an array of entities
            //save these instances for use later
            for (let entityObject of args.intent.entities) {
                console.log(entityObject.type);
                switch (entityObject.type) {
                    case 'Software':
                        Data.conversationData.software = GetClosestMatch(Object.keys(SOFTWARE), entityObject.entity);
                        session.save();
                        break;
                    case 'OS':
                        Data.userData.OS = GetClosestMatch(Object.keys(OS), entityObject.entity);
                        session.save();
                        break;
                }
            }
        }
        next();
    },
    (session, results, next) => {
        if (typeof Data.conversationData.software === 'undefined') {
            session.beginDialog('GetSoftwareInfo');
        }
        next();
    },
    (session, results, next) => {
        if (typeof Data.userData.OS === 'undefined') {
            session.send("I need a little more information before recommending a MATLAB version for you");
            session.beginDialog('GetOSInfo');
        }
        next();
    },
    (session, results, next) => {
        //session.send("before get version");
        if (typeof Data.conversationData["version"] === 'undefined') {
            //session.send("about to get version");
            session.beginDialog('GetVersionInfo');
        }
        //session.send("got version");
        //session.send(JSON.stringify(Data));
        next();
    },
    (session, results, next) => {
        session.send("next step");
        session.save();
        session.send(`Let's help you install ${Data.conversationData.software} version ${Data.conversationData["version"]} on your ${Data.userData.OS} machines!`);
        //depends on what software the user wants to Install
        //start corresponding tutorial
        session.beginDialog(InstallationDialogs[Data.conversationData.software]);
    }
]
