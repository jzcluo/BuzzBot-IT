const builder = require('botbuilder');
const OS = require('../Enums').OPERATINGSYSTEM;
const UNSUPPORTED_VERSIONS_WINDOWS = require('../Enums').UNSUPPORTED_VERSIONS_WINDOWS;
const UNSUPPORTED_VERSIONS_MAC = require('../Enums').UNSUPPORTED_VERSIONS_MAC;
const UNSUPPORTED_VERSIONS_LINUX = require('../Enums').UNSUPPORTED_VERSIONS_LINUX;
const Data = require('../Data').Data;


//To start a dialog, look up the dialog name with the type of OS
const InstallMatlabDialogs = {
    [OS.Windows] : "InstallMatlab_Windows",
    [OS.MacOS] : "InstallMatlab_Mac",
    [OS.Linux] : "InstallMatlab_Linux"
}

//dialog that decides which version of the dialog is ran
//prompt user here if missing any information
module.exports.InstallMatlab = [
    (session, args, next) => {
        if (typeof Data.userData.OS === 'undefined') {
            session.beginDialog('GetOSInfo');
        } else {
            next();
        }
    },
    (session, results, next) => {
        //starts the dialog that corresponds to the user's operating system
        session.beginDialog(InstallMatlabDialogs[Data.userData.OS]);
    }
]

module.exports.InstallMatlab_Windows = [
    (session, args, next) => {
        if (Data.conversationData["version"] in UNSUPPORTED_VERSIONS_WINDOWS) {
            session.send(`Note that if your operating system is ${UNSUPPORTED_VERSIONS_WINDOWS[Data.conversationData["version"]].join(" or ")}, this version of Matlab you are trying to install is not supported.`)
            let choiceList = ["Yes", "No"];
            let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
            builder.Prompts.choice(session, suggestedActions, choiceList);
        } else {
            next();
        }
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            if (results.response.entity == "Yes") {
                next();
            } else {
                session.endConversation("Sorry, I cannot help you with that.");
                session.beginDialog("Help");
            }
        } else {
            next();
        }
    },
    (session, results, next) => {
        //session.send("Let's help you install matlab on Windows")
        next();
    },
    (session, results, next) => {
        //Step 1
        //Go to the download site
        let card = new builder.HeroCard(session)
                        .text("Go to this link to create an Mathworks account and download installation file.")
                        .buttons([
                            builder.CardAction.openUrl(session, "https://www.mathworks.com/academia/tah-portal/georgia-institute-of-technology-621625.html", "open link")
                        ]);
        let message = new builder.Message(session).addAttachment(card);
        session.send(message);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        if (results.response) {
            /*if (results.response.entity == "Go back") {
                //go back a waterfall if user chooses to go back
                next({resumed : builder.ResumeReason.back});
            } else
            */
            if (results.response.entity == "Next Step") {
                let card = new builder.HeroCard(session)
                                .text("Click on the “Get started now” link on the main page. You will be prompted to login. Login with you gatech credentials")
                                .images([
                                    builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Download_Icon.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                let card1 = new builder.HeroCard(session)
                                .text("You will need to create a Mathworks account if you do not have one already.")
                                .images([
                                    builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Create_Account_1-1024x331.jpg")
                                ]);
                let card2 = new builder.HeroCard(session)
                                .text("Note that the Mathworks account is separate from your Georgia Tech login / password.")
                                .images([
                                    builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Create_Account_2.jpg")
                                ]);
                let message = new builder.Message(session).attachments([card1, card2]);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                let card1 = new builder.HeroCard(session)
                                .text("Once logged in under your Mathworks account, download the installer for your platform.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step4.png")
                                ]);
                let card2 = new builder.HeroCard(session)
                                .text("Start the installation by launching the web-based installer you downloaded.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step5.png")
                                ]);
                let message = new builder.Message(session).attachments([card1, card2]);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                let card = new builder.HeroCard(session)
                                .text("Make sure you select “Login with a MathWorks Account”. Then click “Next”.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step6.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                let card = new builder.HeroCard(session)
                                .text("Read the license agreement. If you agree with the terms and conditions, click “Yes”. Then select “Next”.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step7.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                let card = new builder.HeroCard(session)
                                .text("Input the credentials for your MathWorks account associated with your @gatech.edu email address.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step8.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                session.send("This step is important");
                let card1 = new builder.HeroCard(session)
                                .text("Next you will be asked whether you want to install or download MATLAB, then to confirm the type of the license to use.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step9.png")
                                ])
                                .buttons([]);
                let card2 = new builder.HeroCard(session)
                                .text("Make sure you are selecting License 621625 and Label Individual.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step10.png")
                                ]);
                let message = new builder.Message(session).attachments([card1, card2]);
                session.send(message);
                let choiceList = ["Next Step", "Help"];
                let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
                builder.Prompts.choice(session, suggestedActions, choiceList);
            }
        }
    },

    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Next Step") {
                session.endDialog("Press next on everything after and you should have matlab installed on your computer. Comeback if you have more problems.")
            }
        }
    }
]

module.exports.InstallMatlab_Mac = [
    (session, args, next) => {
        session.endDialog("Installation of Matlab on Mac is yet to be implemented");
    }
]

module.exports.InstallMatlab_Linux = [
    (session, args, next) => {
        session.endDialog("Installation of Matlab on Linux is yet to be implemented");
    }
]
