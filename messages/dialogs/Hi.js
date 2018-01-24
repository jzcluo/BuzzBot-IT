const builder = require('botbuilder');

module.exports = [
    (session, args, next) => {
        console.log("am i please called");
        let thumbnailCard = new builder.ThumbnailCard(session)
                            .title('Hi Yellow Jacket')
                            .subtitle('How can I help you today? Select a choice or type down your problem')
                            .buttons([
                                builder.CardAction.postBack(session,'Install', 'Install software'),
                                builder.CardAction.postBack(session, 'Reset', 'Reset my user data')
                            ]);


        let message = new builder.Message(session).addAttachment(thumbnailCard);

        let choices = ['Install', 'Reset'];
        builder.Prompts.choice(session, message, choices);
    },
    (session, results, next) => {

        if (results.response) {
            switch (results.response.entity) {
                case 'Install' :
                    session.beginDialog('GetUserInfo');
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
