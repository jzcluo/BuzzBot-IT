const builder = require('botbuilder');

module.exports.ConversationLog = {
  log: ""
}

const SuggestedActionsMessage = function (session, text, choices) {
  //first parameter is the prompt text parameters that follow it are the choices
  let choiceArray = [];
  for (let i = 0; i < choices.length; i++) {
    choiceArray.push(new builder.CardAction.imBack(session, choices[i], choices[i]));
  }

  let message;
  if (text) { // if text exists
    message = new builder.Message(session)
      .text(text)
      .suggestedActions(builder.SuggestedActions.create(session, choiceArray));
  } else {
    message = new builder.Message(session)
      .suggestedActions(builder.SuggestedActions.create(session, choiceArray));
  }
  return message;
}

const Levenshtein_Distance = function (str1, str2) {
  if (str1.length == 0) {
    return str2.length;
  } else if (str2.length == 0) {
    return str1.length;
  }

  let matrix = [];

  //put str1 on the left
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }

  //put str2 on the top
  for (let i = 0; i <= str2.length; i++) {
    matrix[0][i] = i;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      let substitutionCost = str1.charAt(i - 1) == str2.charAt(j - 1) ? 0 : 1;
      matrix[i][j] = Math.min(
        Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1
        ),
        matrix[i - 1][j - 1] + substitutionCost
      );
    }
  }

  return matrix[str1.length][str2.length];
}

const GetClosestMatch = function (choiceList, userInput) {
  let closetMatch = choiceList[0];
  let minimalEditDistance = userInput.length;
  for (let choice of choiceList) {
    let currentChoiceDistance = Levenshtein_Distance(choice, userInput);
    if (currentChoiceDistance < minimalEditDistance) {
      closetMatch = choice;
      minimalEditDistance = currentChoiceDistance;
    }
  }
  return closetMatch;
}

module.exports.Levenshtein_Distance = Levenshtein_Distance;
module.exports.GetClosestMatch = GetClosestMatch;
module.exports.SuggestedActionsMessage = SuggestedActionsMessage;