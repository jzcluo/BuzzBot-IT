// const Data = {
//     db : {}
// };
module.exports.Data = {
    db : {}
};

const SetOSData = function (id, OS) {
    Data.db.OS = OS;
};
module.exports.SetOSData = SetOSData;
