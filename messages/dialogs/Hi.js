const builder = require('botbuilder');

module.exports = [
    (session, args, next) => {
        let thumbnailCard = new builder.ThumbnailCard(session)
                            .title('Hi Yellow Jacket')
                            .subtitle('How can I help you today with Matlab? Please describe your problem.');
        let message = new builder.Message(session).addAttachment(thumbnailCard);

        session.endDialog(message);
    }
]
