dialogs
This folder contains all the dialogs that the bot uses as well as helper functions. The following files and folders are all within the dialogs folder.

Installation
-InstallMatlab.js
-InstallMatlabHelp.js
IntallMatlab.js include the waterfall dialogs for installing Matlab on different types of machines(MacOS, Windows, Linux). The InstallMatlabHelp.js file has handler for when an user types “help” inside the InstallMatlab.js dialogs. It will detect which step the user had trouble with and help accordingly.

License
-IndividualLicense
	-ActivateLicense.js
	-CreateMathWorksAccount.js
	-DeactivateLicense.js
	-ReactivateExpiredLicense.js
	-ReactivateExpiringLicense.js
-NetworkLicense.js
These file include steps to get license for individual user as well as getting access to Matlab server. 

Back.js
This is a handler for the global “back” intent. It would replace the current dialog with the previous dialog.

Data.js
This file includes data variables that all files can access and modify. It includes conversationData and userData

Email.js
This file includes a function to send an email to the managers of the bot whenever the user gives a negative feedback about the bot experience. It sends the full conversation scripts for diagnosing purpose.

Enums.js
This file contains several enums used with in the bot such as software types and unsupported systems.

GetUserInfo.js
This file has several dialogs that are used to get a user’s information including the user’s software type and actions the user is trying to perform. Some dialogs include “GetOSInfo” and “GetLicenseType”.

Help.js
This is a global intent handler for the “help” intent. This dialog then presents the user with a menu of tasks this bot can help with.

Hi.js
This is the first dialog the user would see when interacting the bot.

Installation.js
This is a global intent handler for the “installation” intent. This dialog then users GetUserInfo.js to get necessary information to identify the user’s request. It then starts the appropriate dialog for installation.

License.js
This file is similar to Installation.js. It is called when the intent is “license”. It would use dialogs with in the GetUserInfo.js to get necessary information and then starts the corresponding license dialog.

None.js
This dialog is called whenever the user’s message does not match with any intent that the bot is registered and therefore cannot help. This dialog would present a menu of things that the bot can do similar to the Help.js dialog.

Util.js
This file includes several helper functions that are used within the bot. For example, it has a function that maps a message to a “suggested action” form which are buttons that disappear after the user clicks on it. It also implements the Levenshtein Distance function if the user happens to misspell a word.
