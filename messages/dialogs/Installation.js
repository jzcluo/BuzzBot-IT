
module.exports = [
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
        session.endDialog(`Ok so you want to install ${session.dialogData.software} on ${session.dialogData.os}`);
    },
    (session, results) => {

    }
]
