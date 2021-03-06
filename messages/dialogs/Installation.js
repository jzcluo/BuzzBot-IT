const builder = require('botbuilder');
const SOFTWARE = require('./Enums').SOFTWARE;
const OS = require('./Enums').OPERATINGSYSTEM;
const GetClosestMatch = require('./Util').GetClosestMatch;
const Data = require('./Data').Data;

const InstallationDialogs = {
  [SOFTWARE.Matlab]: 'InstallMatlab',
  [SOFTWARE.Python]: 'InstallPython',
  [SOFTWARE.Java]: 'InstallJava'
};

module.exports.InstallationDialog = [
  (session, args, next) => {
    console.log(args);
    if (args) {
      for (let entityObject of args.intent.entities) {
        console.log(entityObject.type);
        switch (entityObject.type) {
          case 'Software':
            Data.software = GetClosestMatch(
              Object.keys(SOFTWARE),
              entityObject.entity
            );
            break;
          case 'OS':
            Data.os = GetClosestMatch(Object.keys(OS), entityObject.entity);
            break;
        }
      }
    }
    next();
  },
  (session, results, next) => {
    if (typeof Data.software === 'undefined') {
      session.beginDialog('GetSoftwareInfo');
    }
    next();
  },
  (session, results, next) => {
    if (typeof Data.os === 'undefined') {
      session.send(
        'I need a little more information before recommending a MATLAB version for you'
      );
      session.beginDialog('GetOSInfo');
    }
    next();
  },
  (session, results, next) => {
    session.send('here');
    if (typeof Data['version'] === 'undefined') {
      session.beginDialog('GetVersionInfo');
    }
    next();
  },
  (session, results) => {
    session.send(
      `Let's help you install ${Data.software} version ${
        Data['version']
      } on your ${Data.os} machines!`
    );
    session.beginDialog(InstallationDialogs[Data.software]);
  }
];
