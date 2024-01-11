const {PrimaryUserModel} = require("../../models/userModels");
const {throwError, respondSuccessWithData} = require("../../managers/responseManager");
const NETWORK_LIMIT = 9;
//TODO
const getNetworks = async (req, res) => {
    let {skip} = req.params;
    let num = req.user.num;

    try {
        let network = await PrimaryUserModel.find({num: {$ne: num}}).sort({_id: 1}).skip(skip).limit(NETWORK_LIMIT);

        let networks = [];
        for (let i = 0; i < network.length; i++) {
            let net = network[i].toObject();
            networks.push({
                username: net["fName"] + " " + net["lName"],
                dp: net["dp"]
            });
        }
        respondSuccessWithData(res, networks);

    } catch (e) {
        throwError(res, e);
    }

}

module.exports = {
    getNetworks
}