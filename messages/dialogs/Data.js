const Data = {
    reservedData : {}
};
module.exports.Data = Data;

const SetOSData = function (id, OS) {
    Data.reservedData.OS = OS;
};
module.exports.SetOSData = SetOSData;
