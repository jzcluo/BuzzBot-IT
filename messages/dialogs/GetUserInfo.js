const builder = require('botbuilder');
const GetClosestMatch = require('./Util').GetClosestMatch;
const SuggestedActionsMessage = require('./Util').SuggestedActionsMessage;
const SOFTWARE = require('./Enums').SOFTWARE;
const OPERATINGSYSTEM = require('./Enums').OPERATINGSYSTEM;
const VERSION = require('./Enums').VERSION;
const LICENSETYPE = require('./Enums').LICENSETYPE;
const LICENSEACTION = require('./Enums').LICENSEACTION;
const Data = require('./Data').Data;
//const SetOS = require('./Data').SetOSData;

module.exports.GetSoftwareInfo = [
  (session, args, next) => {
    Data.recognizerEnabled = false; //temporarily disable luis recognizer so user can decide to type info
    //session.save();
    let choiceList = Object.keys(SOFTWARE); //list of software names

    //add the option of other
    choiceList.push('Other');
    let suggestedActions = SuggestedActionsMessage(
      session,
      'What software are you installing',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      if (results.response.entity == 'Other') {
        //if user selects other, prompt them to type in the software they are looking for
        builder.Prompts.text(
          session,
          'Please type the name of the software you are looking for'
        );
      } else {
        //this should be a conversation data as it could be a different software in next interaction
        Data.software = results.response.entity;
        //re-enable luis recognizer
        Data.recognizerEnabled = true;
        //session.save();
        session.endDialog();
      }
    }
  },
  (session, results) => {
    if (results.response) {
      //if user chooses to type in a name for software
      Data.software = GetClosestMatch(Object.keys(SOFTWARE), results.response);
      //re-enable luis recognizer
      Data.recognizerEnabled = true;
      //session.save();
    }
    session.endDialog();
  }
];

module.exports.GetOSInfo = [
  (session, args, next) => {
    //temporarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;

    let choiceList = Object.keys(OPERATINGSYSTEM);
    let suggestedActions = SuggestedActionsMessage(
      session,
      'What operating system are you using',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results) => {
    //if (results.response && results.response.entity) {
    Data.os = results.response.entity;
    //Data.recognizerEnabled = true;
    session.endDialog('Thanks');
  }
];

module.exports.GetVersionInfo = [
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    Data.recognizerEnabled = false;
    session.send('in version');
    //make a clone of VERSION and modify it
    let version = Object.assign({}, VERSION);

    let hint = '';
    session.send(Data.os);
    if (Data.os == 'Windows') {
      version['R2017a'] += ' (Recommended)';
      version['R2017b'] += ' (Not supporting Windows 8)';
      hint =
        'You can find you version number by typing "about" in the search box on your taskbar, and then select About your PC.';
    } else if (Data.os == 'MacOS') {
      version['R2017a'] += ' (Recommended)';
      version['R2017b'] += ' (Not supporting MacOS-X Yosemite)';
      hint =
        'You can find you version number by clicking on the Apple icon in the top left corner of your screen. From there, you can click "About this Mac".';
    } else if (Data.os == 'Linux') {
      version['R2017b'] += ' (Recommended)';
      version['R2017a'] += ' (Not supporting Debian 7)';
      hint =
        'To find out what distribution of linux your running (Ex. Ubuntu) try lsb_release -a or cat /etc/*release or cat /etc/issue* or cat /proc/version.';
    }

    version['R2018a'] += ' (Beta version)';
    session.send('got after version');

    let choiceList = Object.values(version);
    let suggestedActions = SuggestedActionsMessage(
      session,
      'What version of matlab are you trying to download? ' + hint,
      choiceList
    );

    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      Data['version'] = results.response.entity.split(' ')[0];
    }
    Data.recognizerEnabled = true;
    session.endDialog();
  }
];

module.exports.GetLicenseType = [
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let choiceList = Object.keys(LICENSETYPE);
    choiceList.push('Not Sure');

    let suggestedActions = SuggestedActionsMessage(
      session,
      'What type of license are you trying to get?',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      console.log(results.response.entity);
      if (results.response.entity == 'Not Sure') {
        next();
      } else {
        Data.LicenseType = results.response.entity;
        //session.save();
        Data.recognizerEnabled = true;
        session.endDialog();
      }
    }
    next();
  },
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Are you a students, faculty, and staff trying to install on a personal machine or Georgia Tech laptop?',
      ['Yes', 'No']
    );
    builder.Prompts.choice(session, suggestedActions, ['Yes', 'No']);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      if (results.response.entity == 'Yes') {
        Data.LicenseType = 'Individual';
        Data.recognizerEnabled = true;
        //session.save();
        session.endDialog();
      } else {
        next();
      }
    }
    next();
  },
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Are you trying to install on a Georgia Tech system such as office desktop, lab workstation, classroom, server or a computer lab',
      ['Yes', 'No']
    );
    builder.Prompts.choice(session, suggestedActions, ['Yes', 'No'], {
      listStyle: builder.ListStyle.button
    });
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      if (results.response.entity == 'Yes') {
        Data.LicenseType = 'Network';
        Data.recognizerEnabled = true;
        //session.save();
      } else {
        session.endConversation('Sorry, Please contact support');
      }
    }
    session.endDialog();
  }
];

module.exports.GetLicenseAction = [
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let choiceList = Object.keys(LICENSEACTION);
    choiceList.push('Not Sure');
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Which of the following are you trying to do?',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      console.log(results.response.entity);
      if (results.response.entity == 'Not Sure') {
        next();
      } else {
        Data.LicenseAction = results.response.entity;
        //session.save();
        Data.recognizerEnabled = true;
        session.endDialog();
      }
    }
    next();
  },
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Are you trying to get a new license?',
      ['Yes', 'No']
    );
    builder.Prompts.choice(session, suggestedActions, ['Yes', 'No']);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      if (results.response.entity == 'Yes') {
        Data.LicenseAction = 'Activation';
        Data.recognizerEnabled = true;
        //session.save();
        session.endDialog();
      } else {
        next();
      }
    }
    next();
  },
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Is it your first time trying to get a license?',
      ['Yes', 'No']
    );
    builder.Prompts.choice(session, suggestedActions, ['Yes', 'No']);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      if (results.response.entity == 'Yes') {
        Data.LicenseAction = 'Network';
        Data.recognizerEnabled = true;
        //session.save();
      } else {
        session.endConversation('Sorry, Please contact support');
      }
    }
    session.endDialog();
  }
];

module.exports.WhetherLicenseExpired = [
  (session, args, next) => {
    //temperarily disable luis recognizer so user can decide to type info
    //Data.recognizerEnabled = false;
    ////session.save();
    Data.recognizerEnabled = false;
    //session.save();
    console.log(Data.recognizerEnabled);
    let choiceList = ['Yes', 'No'];
    let suggestedActions = SuggestedActionsMessage(
      session,
      'If your license currently expired?',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response && results.response.entity) {
      console.log(results.response.entity);
      Data.LicenseExpired = results.response.entity;
      //session.save();
    }
    Data.recognizerEnabled = true;
    //session.save();
    session.endDialog();
  }
];
