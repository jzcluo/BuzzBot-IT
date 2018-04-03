
const builder = require("botbuilder");
const SuggestedActionsMessage = require('../../Util').SuggestedActionsMessage;

module.exports.ReactivateExpiringLicense = [
    (session, args) => {
        let choiceList = ["Yes", "No"];
        let suggestedActions = SuggestedActionsMessage(session, "It looks like you are trying to reactivate your expiring individual license. Is that correct?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        if (results.response.entity == "Yes") {
            next();
        } else {
            session.send("Sorry about that");
            session.beginDialog("Hi");
        }
    },
    (session, results, next) => {
        session.send("The steps for reactivating expiring individual license is not yet implemented");
        next();
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
