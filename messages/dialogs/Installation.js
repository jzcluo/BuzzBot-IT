const builder = require('botbuilder');
const SOFTWARE = require('./Enums').SOFTWARE;
const OS = require('./Enums').OPERATINGSYSTEM;

const Levenshtein_Distance = require('./Util').Levenshtein_Distance;
const GetClosestMatch = require('./Util').GetClosestMatch;


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
                        session.conversationData.software = GetClosestMatch(Object.keys(SOFTWARE), entityObject.entity);                        session.save();
                        session.save();
                        break;
                    case 'OS':
                        session.userData.OS = GetClosestMatch(Object.keys(OS), entityObject.entity);
                        session.save();
                        break;
                }
            }
        }
        next();
    },
    (session, results, next) => {
        if (typeof session.conversationData.software === 'undefined') {
            session.beginDialog('GetSoftwareInfo');
        }
        if (typeof session.conversationData["version"] === 'undefined') {
            session.beginDialog('GetVersionInfo');
        }
        if (typeof session.userData.OS === 'undefined') {
            session.beginDialog('GetOSInfo');
        }
        next();
    },
    (session, results, next) => {
        session.save();
        session.send(`Let's help you install ${session.conversationData.software}`);
        //depends on what software the user wants to Install
        //start corresponding tutorial
        session.beginDialog(InstallationDialogs[session.conversationData.software]);
    }
]
