const builder = require('botbuilder');

module.exports = [
    (session, args, next) => {
        let thumbnailCard = new builder.ThumbnailCard(session)
                            .title('Hi Yellow Jacket')
                            .subtitle('How can I help you today? Please describe your problem.');
                            //.text("How can I help you?");
                            /*buttons([
                                builder.CardAction.postBack(session,'Install', 'Install software'),
                                builder.CardAction.postBack(session,'Account', 'Account Creation'),
                                builder.CardAction.postBack(session,'License', 'License (re)activation'),
                                builder.CardAction.postBack(session,'GeneralQuestion', 'General Question'),
                                builder.CardAction.postBack(session, 'Reset', 'Reset my user data')
                            ]);
                            */


        let message = new builder.Message(session).addAttachment(thumbnailCard);

        //let choices = ['Install', 'Account', 'License', 'GeneralQuestion', 'Reset'];
        //builder.Prompts.choice(session, message, choices);
        session.send(message);
        next();
    },
    (session, results, next) => {

        if (results.response) {
            switch (results.response.entity) {
                case 'Install' :
                    session.beginDialog('Installation');
                    break;
                case 'Account' :
                    session.beginDialog('CreateAccount');
                    break;
                case 'License' :
                    session.beginDialog('Licensing');
                    break;
                case 'GeneralQuestion':
                    session.send("Please type down your question.")
                    //session.beginDialog('GeneralQuestion');
                    break;
                case 'Reset' :
                    //set empty and call save
                    //https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-state
                    session.userData = {};
                    //session.conversationData = {};
                    //session.dialogData = {};
                    session.save();
                    session.endDialog('Your data in this bot has been cleared');
                    session.beginDialog('Hi');
            }
        }

    }
]
