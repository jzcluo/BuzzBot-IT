const builder = require('botbuilder');

module.exports.GetUserInfo = [
    (session, args, next) => {
        //args contain the entities LUIS extracted
        //If there is at least one entity, args would be defined
        if (args) {
            //args.intent.entities is an array of entities
            //save these instances for use later
            for (let entityObject of args.intent.entities) {
                switch (entityObject.type) {
                    case 'Software':
                        session.dialogData.software = entityObject.entity;
                        session.save();
                        break;
                    case 'OS':
                        session.dialogData.os = entityObject.entity;
                        session.save();
                        break;
                }
            }
        }
        //next({resumed:builder.ResumeReason.reprompt});
        session.send(`Ok so you want to install ${session.dialogData.software} on ${session.dialogData.os}`);
        next();
    },
    (session, results, next) => {
        //next({resumed:builder.ResumeReason.back});
        session.beginDialog('InstallMatlab');
    }
]

module.exports.InstallMatlab = [
    (session, args, next) => {
        session.send("Let's get started");
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
