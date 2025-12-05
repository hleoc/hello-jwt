const { userModel } = require('../models');

const createUsers = async (user) => {
    const userId = await userModel.createUsers(user);
    const findUser = await userModel.findUserByid(userId);

    return { status: 'CREATED', 
        data: { message: 'Novo usuário criado com sucesso', user: findUser } };  
};

const findUserByName = async (userName) => {
    const findUser = await userModel.findUserByName(userName);

    return { status: 'SUCCESSFUL', data: findUser };
};

module.exports = {
    createUsers,
    findUserByName,
};
