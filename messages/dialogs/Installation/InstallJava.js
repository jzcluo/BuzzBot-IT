const builder = require("botbuilder");
const OS = require("../Enums.js").OPERATINGSYSTEM;

//To start a dialog, look up the dialog name with the type of OS
const InstallJavaDialogs = {
  [OS.Windows]: "InstallJava_Windows",
  [OS.MacOS]: "InstallJava_Mac",
  [OS.Linux]: "InstallJava_Linux"
};

//dialog that decides which version of the dialog is ran
//prompt user here if missing any information
module.exports.InstallJava = [
  (session, args, next) => {
    if (typeof session.userData.OS === "undefined") {
      session.beginDialog("GetOSInfo");
    } else {
      //if already have userdata then start corresponding dialog
      next();
    }
  },
  (session, results, next) => {
    //starts the dialog that corresponds to the user's operating system
    session.beginDialog(InstallJavaDialogs[session.userData.OS]);
  }
];

module.exports.InstallJava_Windows = [
  (session, args, next) => {
    session.endDialog(
      "Installation of Java on Windows is yet to be implemented"
    );
  }
];

module.exports.InstallJava_Mac = [
  (session, args, next) => {
    session.endDialog("Installation of Java on Mac is yet to be implemented");
  }
];

module.exports.InstallJava_Linux = [
  (session, args, next) => {
    session.endDialog("Installation of Java on Linux is yet to be implemented");
  }
];
