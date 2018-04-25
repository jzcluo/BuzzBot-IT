index.js file is the entry point of the bot. In index.js, we register all the dialogs the bot will use, setting up the storage account, setting up recognizer to use LUIS recognizer, setting up conversation log storage, and initialize fields of the bot.

The main dialogs are in the dialogs folder.

package.json includes metadata and dependencies of this bot.

function.json is used by Azure function.
