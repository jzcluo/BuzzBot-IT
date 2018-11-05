const builder = require('botbuilder');
const SuggestedActionsMessage = require('./Util').SuggestedActionsMessage;

module.exports = [
  (session, args, next) => {
    session.send('Do you know your previous password?');
    let choiceList = ['Yes', 'No'];
    let suggestedActions = SuggestedActionsMessage(
      session,
      'Continue?',
      choiceList
    );
    builder.Prompts.choice(session, suggestedActions, choiceList);
  },
  (session, results, next) => {
    if (results.response.entity === 'Yes') {
      session.send(
        'please visit https://passport.gatech.edu to reset your password'
      );
    } else if (results.response.entity === 'No') {
      session.send(
        'Please visit https://passport.gatech.edu/activation/forgot-password to reset your password'
      );
    }
    next();
  },
  (session, results, next) => {
    session.endDialog('Thanks');
    session.beginDialog('Hi');
  }
];
