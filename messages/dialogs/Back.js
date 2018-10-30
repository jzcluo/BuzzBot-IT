const builder = require('botbuilder');

module.exports = [
  (session, args, next) => {
    let dialogStack = session.dialogStack();
    let currentDialog = args.dialogIndex;
    console.log(currentDialog);
    console.log(dialogStack);

    let lastDialog = dialogStack[currentDialog - 1].id;
    console.log(dialogStack[args.dialogIndex].id);
    session.cancelDialog(dialogStack[args.dialogIndex].id);
    console.log(dialogStack);

    session.send('Going back to the last step you were on.');
    session.beginDialog(lastDialog);

    session.endDialog();
  }
];
