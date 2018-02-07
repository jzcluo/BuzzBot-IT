
const builder = require("botbuilder");

module.exports.DeactivateLicense = [
    (session, args) => {
        session.send("Let's help you deactivate your individual license?");
        builder.Prompts.choice(session, " ", ["Yes", "No"], {listStyle : builder.ListStyle.button});
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
        builder.Prompts.choice(session, "Did that solve your problem?", ["Yes", "No"], {listStyle : builder.ListStyle.button});
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
