const builder = require('botbuilder');

module.exports = [
    (session, args, next) => {
        console.log("Luis args in Hi");
        console.log(args);
        let thumbnailCard = new builder.ThumbnailCard(session)
                            .title('Hi Yellow Jacket')
                            .subtitle('How can I help you today? Please describe your problem.');
        let message = new builder.Message(session).addAttachment(thumbnailCard);

        session.endDialog(message);
    }
]
