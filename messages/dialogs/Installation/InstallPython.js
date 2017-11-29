const builder = require('botbuilder');
const OS = require('../Enums.js').OPERATINGSYSTEM;

//To start a dialog, look up the dialog name with the type of OS
const InstallPythonDialogs = {
    [OS.Windows] : "InstallPython_Windows",
    [OS.MacOS] : "InstallPython_Mac",
    [OS.Linux] : "InstallPython_Linux"
}

//dialog that decides which version of the dialog is ran
//prompt user here if missing any information
module.exports.InstallPython = [
    (session, args, next) => {
        if (typeof session.userData.OS === 'undefined') {
            session.beginDialog('GetOSInfo');
        } else {
            //if already have userdata then start corresponding dialog
            next();
        }
    },
    (session, results, next) => {
        //starts the dialog that corresponds to the user's operating system
        session.beginDialog(InstallPythonDialogs[session.userData.OS]);
    }
]

module.exports.InstallPython_Windows = [
    (session, args, next) => {
        session.endDialog("Installation of Python on Windows is yet to be implemented");
    }
]

module.exports.InstallPython_Mac = [
    (session, args, next) => {
        session.endDialog("Installation of Python on Mac is yet to be implemented");
    }
]

module.exports.InstallPython_Linux = [
    (session, args, next) => {
        session.endDialog("Installation of Python on Linux is yet to be implemented");
    }
]
