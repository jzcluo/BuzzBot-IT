const builder = require('botbuilder');
const GetClosestMatch = require('./Installation').GetClosestMatch;
const SOFTWARE = require('./Enums').SOFTWARE;
const OS = require('./Enums').OPERATINGSYSTEM;

module.exports.GetSoftwareInfo = [
    (session, args, next) => {
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
                session.save();
                session.endDialog();
            }
        }
    },
    (session, results) => {
        if (results.response) {
            //if user chooses to type in a name for software
            session.conversationData.software = GetClosestMatch(Object.keys(SOFTWARE), results.response);
            session.save();
        }
        session.endDialog();
    }
]


module.exports.GetOSInfo = [
    (session, args, next) => {
        let choiceList = Object.keys(OS);
        builder.Prompts.choice(session, "What operating system are you using?", choiceList, {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            session.userData.os = results.response.entity;
        }
        session.endDialog();
    }
]
