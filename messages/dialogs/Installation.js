const builder = require('botbuilder');


module.exports.ExtractUserInfo = [
    (session, args, next) => {

        //args contain the entities LUIS extracted
        //If there is at least one entity, args would be defined
        console.log(args);
        if (args) {
            //args.intent.entities is an array of entities
            //save these instances for use later
            for (let entityObject of args.intent.entities) {
                switch (entityObject.type) {
                    case 'Software':
                        session.conversationData.software = GetClosestMatch(["Matlab", "Python"], entityObject.entity);                        session.save();
                        break;
                    case 'OS':
                        session.userData.os = GetClosestMatch(["MacOS", "Windows", "Linux"], entityObject.entity);
                        session.save();
                        break;
                }
            }
        }
        //next({resumed:builder.ResumeReason.reprompt});
        //session.send(`Ok so you want to install ${session.userData.software} on ${session.userData.os}`);
        next();
    },
    (session, results, next) => {
        session.conversationData.recognizerEnabled = false;
        session.save();
        if (typeof session.conversationData.software === 'undefined') {
            session.beginDialog('GetSoftwareInfo');
        }
    },
    (session, results, next) => {
        session.conversationData.recognizerEnabled = true;
        session.save();
        session.send(`you chose ${session.conversationData.software}`);
        //depends on what software the user wants to Install
        //start corresponding tutorial
        switch (session.conversationData.software) {
            
        }
    }
]

module.exports.InstallMatlab = [
    (session, args, next) => {
        session.send("Let's get started");
        //get necessary information from the user
        if (typeof session.userData.os === 'undefined') {
            session.beginDialog('GetOSInfo');
        }
        next();
    },
    (session, results, next) => {
        //Step 1
        //Go to the download site
        let card = new builder.HeroCard(session)
                        .title("Go to this link")
                        .buttons([
                            builder.CardAction.openUrl(session, "https://www.mathworks.com/academia/tah-portal/georgia-institute-of-technology-621625.html", "open link")
                        ]);
        let message = new builder.Message(session).addAttachment(card);
        session.send(message);
        builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
    },
    (session, results, next) => {
        if (results.response) {
            /*if (results.response.entity == "Go back") {
                //go back a waterfall if user chooses to go back
                next({resumed : builder.ResumeReason.back});
            } else
            */
            if (results.response.entity == "Continue") {
                let card = new builder.HeroCard(session)
                                .text("Click on the “Get started now” link on the main page. You will be prompted to login. Login with you gatech credentials")
                                .images([
                                    builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Download_Icon.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                let card1 = new builder.HeroCard(session)
                                .text("You will need to create a Mathworks account if you do not have one already.")
                                .images([
                                    builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Create_Account_1-1024x331.jpg")
                                ]);
                let card2 = new builder.HeroCard(session)
                                .text("Note that the Mathworks account is separate from your Georgia Tech login / password.")
                                .images([
                                    builder.CardImage.create(session, "http://matlab.gatech.edu/wp-content/uploads/sites/63/2017/08/Matlab_Portal_Create_Account_2.jpg")
                                ]);
                let message = new builder.Message(session).attachments([card1, card2]);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                let card1 = new builder.HeroCard(session)
                                .text("Once logged in under your Mathworks account, download the installer for your platform.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step4.png")
                                ]);
                let card2 = new builder.HeroCard(session)
                                .text("Start the installation by launching the web-based installer you downloaded.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step5.png")
                                ]);
                let message = new builder.Message(session).attachments([card1, card2]);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                let card = new builder.HeroCard(session)
                                .text("Make sure you select “Login with a MathWorks Account”. Then click “Next”.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step6.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                let card = new builder.HeroCard(session)
                                .text("Read the license agreement. If you agree with the terms and conditions, click “Yes”. Then select “Next”.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step7.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                let card = new builder.HeroCard(session)
                                .text("Input the credentials for your MathWorks account associated with your @gatech.edu email address.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step8.png")
                                ]);
                let message = new builder.Message(session).addAttachment(card);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },
    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                session.send("This step is important");
                let card1 = new builder.HeroCard(session)
                                .text("Next you will be asked whether you want to install or download MATLAB, then to confirm the type of the license to use.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step9.png")
                                ]);
                let card2 = new builder.HeroCard(session)
                                .text("Make sure you are selecting License 621625 and Label Individual.")
                                .images([
                                    builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2017/09/Step10.png")
                                ]);
                let message = new builder.Message(session).attachments([card1, card2]);
                session.send(message);
                builder.Prompts.choice(session, " ", ["Continue"], {listStyle : builder.ListStyle.button});
            }
        }
    },

    (session, results, next) => {
        if (results.response) {
            if (results.response.entity == "Continue") {
                session.endDialog("Press next on everything after and you should have matlab installed on your computer. Comeback if you have more problems.")
            }
        }
    }
]

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
