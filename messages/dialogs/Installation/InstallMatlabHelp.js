
module.exports.InstallMatlabHelp_Windows = [
    (session, args, next) => {
        session.send("let's help you with installation of matlab");
    },
    (session, results, next) => {
        session.endDialog("Returning to previous step");
    }
]
