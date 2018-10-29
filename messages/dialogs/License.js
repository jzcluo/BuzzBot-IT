const builder = require("botbuilder");
const LICENSEACTION = require("./Enums").LICENSEACTION;
const LICENSETYPE = require("./Enums").LICENSETYPE;

const Levenshtein_Distance = require("./Util").Levenshtein_Distance;
const GetClosestMatch = require("./Util").GetClosestMatch;

const Data = require("./Data").Data;

module.exports.LicensingDialog = [
  (session, args, next) => {
    //args contain the entities LUIS extracted
    //If there is at least one entity, args would be defined
    console.log(args);
    if (args) {
      //args.intent.entities is an array of entities
      //save these instances for use later
      for (let entityObject of args.intent.entities) {
        console.log(entityObject.type);
        switch (entityObject.type) {
          case "LicenseAction":
            Data.LicenseAction = GetClosestMatch(
              Object.keys(LICENSEACTION),
              entityObject.entity
            );
            session.save();
            break;
          case "LicenseType":
            Data.LicenseType = GetClosestMatch(
              Object.keys(LICENSETYPE),
              entityObject.entity
            );
            session.save();
            break;
        }
      }
      //it has to be individual license because only individual license has reactivation and deactivation process
      if (
        Data.LicenseAction == "Deactivation" ||
        Data.LicenseAction == "Reactivation"
      ) {
        Data.LicenseType = "Individual";
      }
    }
    next();
  },
  (session, results, next) => {
    if (typeof Data.LicenseType === "undefined") {
      session.beginDialog("GetLicenseType");
    }
    next();
  },
  (session, results, next) => {
    if (Data.LicenseType == "Network") {
      session.beginDialog("GetNetworkLicense");
    } else if (typeof Data.LicenseAction === "undefined") {
      session.beginDialog("GetLicenseAction");
    }
    next();
  },
  (session, results, next) => {
    if (Data.LicenseAction == "Activation") {
      session.beginDialog("ActivateLicense");
    } else if (Data.LicenseAction == "Deactivation") {
      session.beginDialog("DeactivateLicense");
    } else {
      session.beginDialog("WhetherLicenseExpired");
      next();
    }
  },
  (session, results) => {
    if (Data.LicenseExpired == "Yes") {
      session.beginDialog("ReactivateExpiredLicense");
    } else {
      session.beginDialog("ReactivateExpiringLicense");
    }
  }
];
