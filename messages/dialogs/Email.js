const builder = require('botbuilder');
const nodemailer = require('nodemailer');
const ConversationLog = require('./Util').ConversationLog;

module.exports.SendEmail = [
    (session, args, next) => {
        //sendIssueLog(session);
        session.endDialog("Sorry about that. I have sent this conversation log to my boss.");
    }
];

const sendIssueLog = function(session) {
    let transporter = nodemailer.createTransport({
        host : "smtp-mail.outlook.com",
        secureConnection : false,
        port : 587,
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: 'buzzbot-it@outlook.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //send question and answer
    //<p>Question : ${session.dialogData.question}<br/>
    //BotAnswer : ${session.dialogData.answer}</p><br/>
    let mailOptions = {
        from: '"Your personal MATLAB expert" <buzzbot-it@outlook.com>', // sender address (who sends)
        to: 'zluo@gatech.edu, annalise.irby@gatech.edu', // list of receivers (who receives) separated by commas
        subject: 'BuzzBot-IT Issue Log', // Subject line
        html: `<body>
                    <h2>Full Conversation Transcript</h2><br/>
                    <p>${ConversationLog.log.substring(24)}</p><br/>
                </body>`
    };
    ConversationLog.log = '';

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }

        console.log('Message sent: ' + info.response);
    });
};
