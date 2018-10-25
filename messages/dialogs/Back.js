const builder = require('botbuilder');

module.exports = [
  (session, args, next) => {
    //to get which waterfall step the user had trouble with
    //session.dialogStack() returns array of dialogs
    //within args, there is a args.dialogindex that would give index of previous dialog
    //combining these two, we could get which waterfall step user had trouble with
    //let waterfallStepIndex = session.dialogStack()[args.dialogIndex].state["BotBuilder.Data.WaterfallStep"];

    console.log(args.dialogIndex);
    console.log(session.dialogStack());
    let dialogStack = session.dialogStack();

    let currentDialog = args.dialogIndex;

    let lastDialog = session.dialogStack()[currentDialog - 1].id;
    console.log(session.dialogStack()[args.dialogIndex].id);
    session.cancelDialog(session.dialogStack()[args.dialogIndex].id); //, session.dialogStack()[args.dialogIndex - 1].id);
    console.log(session.dialogStack());

    session.send("Going back to the last step you were on.");
    session.beginDialog(lastDialog);

    //session.dialogStack()[args.dialogIndex].state["BotBuilder.Data.WaterfallStep"] = waterfallStepIndex - 2;

    session.endDialog();
  }
]