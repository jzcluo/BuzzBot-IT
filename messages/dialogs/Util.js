
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
