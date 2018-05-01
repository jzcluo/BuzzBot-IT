const builder = require('botbuilder');
const request = require('superagent');
const SuggestedActionsMessage = require('./Util').SuggestedActionsMessage;


module.exports.SearchDialog = [
    (session, args, next) => {
        let question = session.message.text;
        session.sendTyping();
        search(session, question);
    },
    (session, results, next) => {
        if (results.response && results.response.entity) {
            if (results.response.entity == "Yes") {
                session.send("I am glad I helped!");
                session.endDialog("Bye~");
            } else {
                session.endConversation("Sorry about that. See if any of the following helps you.");
                session.beginDialog("Help");
            }
        }
    }
];

const search = function(session, question) {
    let url = process.env.CUSTOM_SEARCH_API;
    question = question.split(",").join("+");

    request.get(url+question)
        .then((res) => {
            let results = res.body.items;
            //show the results in a carousel
            session.send("I did a search on the web for you and I found these websites helpful.");
            let arrayLength = results.length;
            webSearchInfo = results.slice(1, arrayLength > 4 ? 4 : arrayLength);

            let webSearchCard = webSearchInfo.map(website => {
                return {
                    contentType : "application/vnd.microsoft.card.adaptive",
                    content : {
                        type : "AdaptiveCard",
                        body : [
                            {
                                "type" : "TextBlock",
                                "text" : website.title,
                                "weight" : "bolder",
                                "wrap" : true
                            },
                            {
                                "type" : "TextBlock",
                                "text" : website.snippet,
                                "wrap" : true
                            }
                        ],
                        actions : [
                            {
                                "type" : "Action.OpenUrl",
                                "title" : "More Info",
                                "url" : website.link
                            }
                        ]
                    }
                }
            });


            let message = new builder.Message(session)
                                            .attachmentLayout(builder.AttachmentLayout.carousel)
                                            .attachments(webSearchCard);


            session.send(message);
            let choiceList = ["Yes", "No"];
            let suggestedActions = SuggestedActionsMessage(session, "Did the search results solve your problem?", choiceList);
            builder.Prompts.choice(session, suggestedActions, choiceList);
        })
        .catch((err) => {
            console.log(err);
        })
};
