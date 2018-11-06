const builder = require('botbuilder');
const SuggestedActionsMessage = require('./Util').SuggestedActionsMessage;

module.exports = [
  (session, args, next) => {
    let choiceList = ['Yes', 'No'];
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Do you know your previous password?',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response.entity === 'Yes') {
      session.send(
        'please visit https://passport.gatech.edu to reset your password'
      );
      session.dialogData.known_pwd = 'Yes';
      next();
    } else if (results.response.entity === 'No') {
      session.send(
        'Please visit https://passport.gatech.edu/activation/forgot-password to reset your password'
      );
      session.dialogData.known_pwd = 'No';
      next();
    }
  },
  (session, results, next) => {
    let choiceList = ['Yes', 'No'];
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Do you need further help?',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response.entity === 'Yes') {
      if (session.dialogData.known_pwd == 'Yes') {
        session.send(
          `Given condition ${
            session.dialogData.known_pwd
          } This function is not yet implemented`
        );
      } else {
        session.send(
          `Given condition ${
            session.dialogData.known_pwd
          } This function is not yet implemented`
        );
        session.send('This function is not yet implemented');
      }
    } else {
      session.endDialog();
    }
  }
];
