const builder = require("botbuilder");
const SuggestedActionsMessage = require('../../Util').SuggestedActionsMessage;

module.exports.CreateAccount = [
    (session, args) => {
        session.send("Let's help you create a MathWorks account?");
        let choiceList = ["Yes", "No"];
        let suggestedActions = SuggestedActionsMessage(session, "", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        if (results.response.entity == "Yes") {
            next();
        } else {
            session.send("Sorry about that");
            session.endDialog();
            session.beginDialog("Hi");
        }
    },
    (session, results, next) => {
        session.send(`Let's help you create a MathWorks account`);
        session.send(`The Georgia Tech’s MATLAB Portal is available at this link. Please click to open this link.`);
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .buttons([
                        builder.CardAction.openUrl(session, "https://www.mathworks.com/academia/tah-portal/georgia-institute-of-technology-621625.html", "Link to Georgia Tech's MATLAB Portal")
                    ])
            ]);
        session.send(herocards);
        let choiceList = ["Next Step"];
        let suggestedActions = SuggestedActionsMessage(session, "", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Step 1- click on the “Get started now” link on the main page`)
                    .images([
                        builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Download_Icon.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step"];
        let suggestedActions = SuggestedActionsMessage(session, "", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Step 2- login with your GT credentials`)
                    .images([
                        builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Port_GT_Login_1-1024x754.png"),
                        builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Port_GT_Login_2-1024x684.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step"];
        let suggestedActions = SuggestedActionsMessage(session, "", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Step 3- You will need to create a Mathworks account if you do not have one already. The Mathworks account is separate from your Georgia Tech login / password.`)
                    .images([
                        builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Create_Account_1-1024x331.jpg"),
                        builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Create_Account_2.jpg")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Finish"];
        let suggestedActions = SuggestedActionsMessage(session, "", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let choiceList = ["Yes", "No"];
        let suggestedActions = SuggestedActionsMessage(session, "Did that solve your problem?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        if (results.response.entity == "Yes") {
            session.endConversation("I'm glad I helped~")
        } else {
            let card = new builder.HeroCard(session)
                            .text("Please contact MathWorks support. For emergency, you could use MATLAB online.")
                            .buttons([
                                builder.CardAction.openUrl(session, "https://www.mathworks.com/support/contact_us.html?s_tid=sp_ban_cs", "MathWorks Support Page"),
                                builder.CardAction.openUrl(session, "https://www.mathworks.com/products/matlab-online.html", "Matlab online")
                            ]);
            let message = new builder.Message(session).addAttachment(card);
            session.endConversation(message);
        }
    }
 ]
