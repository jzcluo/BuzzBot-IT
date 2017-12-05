
module.exports.InstallMatlabHelp_Windows = [
    (session, args, next) => {
        //to get which waterfall step the user had trouble with
        //session.dialogStack() returns array of dialogs
        //within args, there is a args.dialogindex that would give index of previous dialog
        //combining these two, we could get which waterfall step user had trouble with
        let waterfallStepIndex = session.dialogStack()[args.dialogIndex].state["BotBuilder.Data.WaterfallStep"];
        session.send(`So you are stuck on Step${waterfallStepIndex} of the installation. Let's help you with that.`);
        next();
    },
    (session, results, next) => {
        session.endDialog("Returning to previous step");
    }
]
