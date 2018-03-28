/*
Dialog to get Network license (for office desktop, lab workstation, classroom, server or a computer lab)
*/
const builder = require('botbuilder');
const SuggestedActionsMessage = require('../Util').SuggestedActionsMessage;

module.exports.GetNetworkLicense = [
    (session, args) => {
        let choiceList = ["Yes", "No"];
        let suggestedActions = SuggestedActionsMessage(session, "Let's help you get network license!", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        if (results.response.entity == "Yes") {
            next();
        } else {
            session.endDialog("Sorry about that");
            session.beginDialog("Hi");
        }
    },
    (session, results, next) => {
        session.send(` First you need to be on a Georgia Tech owned machine that can talk to the campus license server. Typically, this means the system is on the Georgia Tech network in an office or lab or on the campus VPN.`);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        session.send(`To use a network license`);
        session.send(` download Matlab installers from software.oit.gatech.edu`);
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .buttons([
                        builder.CardAction.openUrl(session, "software.oit.gatech.edu", "Matlab installer page")
                    ])
            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue? More details on files to install in next step", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        session.send("The ISO image files corresponding to the Windows platform: R2017b_win64_dvd1.iso R2017b_win64_dvd2.iso");
        session.send("The file called license.dat. This file is required during the installation process. It is highly recommended that this file be downloaded prior to the installation. Once done you will need to extract the zip file.");
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Start the installation by launching “setup.exe” from the downloaded ISO image.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step2.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Make sure you select “Use a File Installation Key”. Then click “Next”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step3.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`click “Yes” and then click “Next”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step4.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Enter the following File Installation Key (make sure to avoid any leading and/or trailing spaces). Then click “Next”. 19811-63381-39632-64689-45816-28031-02371-11344-23344-55051-54611-49353-44636-41025-10294-22461-63683-46964-30928-12461-48246-33632-02160`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step5.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Review the installation folder and change if necessary. Then click “Next”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step6.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Make sure the License Manager component is unselected. Click “Next”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step7.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`select the license.dat file you downloaded along with the MATLAB binaries. Then click “Next”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step8.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`Review the installation options and click “Next” in order to start the installation.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step9.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`and click “Install”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step10.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .text(`A progress indicator will be displayed. The installation of MATLAB can take 20 to 40 minutes depending on the speed of your computer`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step11.png")
                    ])
,
                new builder.HeroCard(session)
                    .text(`Note that You will be asked to insert DVD2. If you are mounting an ISO image using virtual clone drive under Win7 or the built-in Win 8.1 / 10 function. unmount it first. This can be done typically by right-clicking on the virtual DVD drive and selecting unmount.`)
                    .images([
                        builder.CardImage.create(session, `http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step11(2).png`)
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`review the additional configuration steps (if applicable). Then select “Next”.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step12.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Next Step", "Help"];
        let suggestedActions = SuggestedActionsMessage(session, "Continue?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let herocards = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .text(`and you are ready to use MATLAB.`)
                    .images([
                        builder.CardImage.create(session, "http://buzzbot-it.gatech.edu/wp-content/uploads/sites/677/2018/03/Step13.png")
                    ])

            ]);
        session.send(herocards);
        let choiceList = ["Finish"];
        let suggestedActions = SuggestedActionsMessage(session, "This is the last step of the network license installation process", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        let choiceList = ["Yes", "No"];
        let suggestedActions = SuggestedActionsMessage(session, "Did that solve your problem?", choiceList);
        builder.Prompts.choice(session, suggestedActions, choiceList);
    },
    (session, results, next) => {
        if (results.response.entity == "Yes") {
            session.endConversation("I'm glad I helped~")
        } else {
            let card = new builder.HeroCard(session)
                            .text("Please contact MathWorks support. For emergency, you could use MATLAB online.")
                            .buttons([
                                builder.CardAction.openUrl(session, "https://www.mathworks.com/support/contact_us.html?s_tid=sp_ban_cs", "MathWorks Support Page"),
                                builder.CardAction.openUrl(session, "https://www.mathworks.com/products/matlab-online.html", "Matlab online")
                            ]);
            let message = new builder.Message(session).addAttachment(card);
            session.endConversation(message);
        }
    }
]
