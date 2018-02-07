/*
Dialog to get Network license (for office desktop, lab workstation, classroom, server or a computer lab)
*/
const builder = require('botbuilder');

module.exports.GetNetworkLicense = [
    (session, args) => {
        session.send("Let's help you get network license");
        builder.Prompts.choice(session, " ", ["Yes", "No"], {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response.entity == "Yes") {
            next();
        } else {
            session.endDialog("Sorry about that");
            session.beginDialog("Hi");
        }
    }
]
