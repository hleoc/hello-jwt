const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createUsers = async (req, res) => {
    const user = req.body;

    const { status, data } = await userService.createUsers(user);

    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    createUsers,
};