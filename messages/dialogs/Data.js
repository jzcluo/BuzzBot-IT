const Data = {
    db : {}
};
module.exports.Data = Data;

const SetOSData = function (id, OS) {
    Data.db.OS = OS;
};
module.exports.SetOSData = SetOSData;
