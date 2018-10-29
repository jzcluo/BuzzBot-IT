const builder = require("botbuilder");

module.exports = [
  (session, args, next) => {
    console.log("Luis args in None");
    console.log(args);
    //console.log(args.intent.intents);
    let thumbnailCard = new builder.ThumbnailCard(session)
      .subtitle("Sorry I didn't understand. Here are the things I can do.")
      .buttons([
        builder.CardAction.postBack(session, "Install", "Install Matlab"),
        builder.CardAction.postBack(
          session,
          "Account",
          "Mathworks Account Creation"
        ),
        builder.CardAction.postBack(
          session,
          "License",
          "Matlab License (re)activation"
        ),
        builder.CardAction.postBack(
          session,
          "GeneralQuestion",
          "General Question about Matlab"
        ),
        builder.CardAction.postBack(
          session,
          "GeorgePBurdell",
          "Bio and information about George P. Burdell"
        )
        //builder.CardAction.postBack(session, 'Reset', 'Reset my user data')
      ]);
    let message = new builder.Message(session).addAttachment(thumbnailCard);

    let choices = ["Install", "Account", "License", "GeneralQuestion"]; //, //'Reset'];
    builder.Prompts.choice(session, message, choices);
    next();
  },
  (session, results, next) => {
    if (results.response) {
      switch (results.response.entity) {
        case "Install":
          session.beginDialog("Installation");
          break;
        case "Account":
          session.beginDialog("CreateAccount");
          break;
        case "License":
          session.beginDialog("Licensing");
          break;
        case "GeneralQuestion":
          session.send("Please type down your question.");
          //session.beginDialog('GeneralQuestion');
          break;
        case "Reset":
          //set empty and call save
          //https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-state
          session = {};
          //session = {};
          //session.dialogData = {};
          session.save();
          session.endDialog("Your data in this bot has been cleared");
          session.beginDialog("Hi");
      }
    }
  }
];
