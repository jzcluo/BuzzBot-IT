// const Data = {
//     db : {}
// };
module.exports.Data = {
  conversationData: {}
};

const SetOSData = function(id, OS) {
  Data.db.OS = OS;
};

module.exports.SetOSData = SetOSData;
