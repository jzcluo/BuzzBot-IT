const builder = require("botbuilder");
const SuggestedActionsMessage = require("./Util").SuggestedActionsMessage;

module.exports = [
  (session, args, next) => {
    let thumbnailCard = new builder.ThumbnailCard(session)
      .subtitle("The bio and information about GPB")
      .buttons([
        builder.CardAction.postBack(session, "bio", "know GPB bio"),
        builder.CardAction.postBack(session, "info", "know GPB tradition")
      ]);
    let message = new builder.Message(session).addAttachment(thumbnailCard);
    let choices = ["bio", "info"];
    builder.Prompts.choice(session, message, choices);
  },
  (session, results, next) => {
    if (results.response.entity == "bio") {
      let thumbnailCard = new builder.ThumbnailCard(session).title(
        "George P. Burdell Bio"
      )
        .subtitle(`George P. Burdell is a fictitious student officially enrolled at Georgia Tech in 1927 as a practical joke. 
        Since then, he has supposedly received all undergraduate degrees offered by Georgia Tech, served in the military, 
        gotten married, and served on Mad magazine's Board of Directors, among other accomplishments. 
        Burdell at one point led the online poll for Time's 2001 Person of the Year award. He has evolved into an important 
        and notorious campus tradition; all Georgia Tech students learn about him at orientation.`);
      let message = new builder.Message(session).addAttachment(thumbnailCard);
      session.send(message);
    } else if (results.response.entity == "info") {
      let thumbnailCard = new builder.ThumbnailCard(session).title(
        "GT tradition"
      )
        .subtitle(`Burdell is a campus icon at Georgia Tech, and incoming freshmen are introduced to him as one of the greatest 
        alumni to graduate from the school. George P. Burdell is often paged over the public address system during football games 
        and also at airports, bars, and hotels. Georgia Tech students or alumni often use his name as an alias when they do not 
        want to disclose their real name. There is a store in Georgia Tech's student center named "Burdell's". \n

        During a speech made by US President Barack Obama held at Georgia Tech in the McCamish Pavilion on March 10, 2015,
         the president jokingly indicated that he was supposed to be introduced by George P. Burdell, but no one could find George.`);
      let message = new builder.Message(session).addAttachment(thumbnailCard);
      session.send(message);
    }
    session.endDialog();
    session.beginDialog("Hi");
  }
];
