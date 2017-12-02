const builder = require('botbuilder');
const SOFTWARE = require('./Enums').SOFTWARE;
const OS = require('./Enums').OPERATINGSYSTEM;


const InstallationDialogs = {
    [SOFTWARE.Matlab] : "InstallMatlab",
    [SOFTWARE.Python] : "InstallPython",
    [SOFTWARE.Java] : "InstallJava"
};

module.exports.ExtractUserInfo = [
    (session, args, next) => {

        //args contain the entities LUIS extracted
        //If there is at least one entity, args would be defined
        console.log(args);
        if (args) {
            //args.intent.entities is an array of entities
            //save these instances for use later
            for (let entityObject of args.intent.entities) {
                switch (entityObject.type) {
                    case 'Software':
                        session.conversationData.software = GetClosestMatch(Object.keys(SOFTWARE), entityObject.entity);                        session.save();
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
        session.conversationData.recognizerEnabled = false;
        session.save();
        if (typeof session.conversationData.software === 'undefined') {
            session.beginDialog('GetSoftwareInfo');
        }
        next();
    },
    (session, results, next) => {
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.send(`Let's help you install ${session.conversationData.software}`);
        //depends on what software the user wants to Install
        //start corresponding tutorial
        session.beginDialog(InstallationDialogs[session.conversationData.software]);
    }
]


const Levenshtein_Distance = function (str1, str2) {
    if (str1.length == 0) {
        return str2.length;
    } else if (str2.length == 0) {
        return str1.length;
    }

    let matrix = [];

    //put str1 on the left
    for (let i = 0; i <= str1.length; i++) {
        matrix[i] = [i];
    }

    //put str2 on the top
    for (let i = 0; i <= str2.length; i++) {
        matrix[0][i] = i;
    }

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            let substitutionCost = str1.charAt(i - 1) == str2.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1
                ),
                matrix[i - 1][j - 1] + substitutionCost
            );
        }
    }

    return matrix[str1.length][str2.length];
}

const GetClosestMatch = function (choiceList, userInput) {
    let closetMatch = choiceList[0];
    let minimalEditDistance = userInput.length;
    for (let choice of choiceList) {
        let currentChoiceDistance = Levenshtein_Distance(choice, userInput);
        if (currentChoiceDistance < minimalEditDistance) {
            closetMatch = choice;
            minimalEditDistance = currentChoiceDistance;
        }
    }
    return closetMatch;
}

module.exports.Levenshtein_Distance = Levenshtein_Distance;
module.exports.GetClosestMatch = GetClosestMatch;
