const builder = require('botbuilder');

module.exports.InstallMatlabHelp_Windows = [
  (session, args, next) => {
    //to get which waterfall step the user had trouble with
    //session.dialogStack() returns array of dialogs
    //within args, there is a args.dialogindex that would give index of previous dialog
    //combining these two, we could get which waterfall step user had trouble with
    let waterfallStepIndex = session.dialogStack()[args.dialogIndex].state["BotBuilder.Data.WaterfallStep"];

    //define each step in an array
    let waterfallSteps = [
      "Open Link",
      "Click On Get Started",
      "Create Mathworks Account",
      "Download and Start Installer",
      "Login with Mathworks Account",
      "Read License Agreement",
      "Input Mathworks Account",
      "Select License",
      "Press Next"
    ];

    session.send(`So you are stuck on ${waterfallStepIndex - 1 < 9 ? waterfallSteps[waterfallStepIndex - 1] : waterfallSteps[8]} of the installation. Let's help you with that.`);

    //help message that will be sent to the user.
    //these index correponds to the above waterfallSteps
    let helpMessages = [
      'You just open the click on the "open link" button and it will open link in browser for you',
      'There is a button on the website that says "Get Started", click on that button',
      'Fill out the specified fields to get a Mathworks account, the login is seperate from Georgia Tech login so you can have a different password',
      'You should see a download screen. Press download and wait for it to download. Then start it by clicking on the installer',
      "After opening the installer, choose login",
      "Just press agree and continue",
      "Login with the Mathworks account you just created",
      'Choose "Install" and input 621625 for the license number',
      "Just press next"
    ];

    session.send(waterfallStepIndex - 1 < 9 ? helpMessages[waterfallStepIndex - 1] : helpMessages[8])
    next();
  },
  (session, results, next) => {
    builder.Prompts.choice(session, "Did that solve your problem?", ["YES", "NO"], {
      listStyle: builder.ListStyle.button
    });
  },
  (session, results) => {
    if (results.response) {
      if (results.response.entity == "YES") {
        session.endDialog("Let's keep going then.");
      } else {
        session.endDialog("Sorry...");
      }
    }
  }
]