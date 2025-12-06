const { userModel } = require('../models');

const createUsers = async (user) => {
    const { userName } = user;
    
    const checkUserName = await userModel.findUserByName(userName);
    if (checkUserName) {
        return { status: 'CONFLICT', data: { message: 'Usuário já existe.' } };
    }

    const userId = await userModel.createUsers(user);
    const findUser = await userModel.findUserByid(userId);

    return { status: 'CREATED', 
        data: { message: 'Novo usuário criado com sucesso', user: findUser } };  
};

const getByUserId = async (userId) => {
    const findUser = await userModel.findUserByid(userId);

     return { status: 'SUCCESSFUL', data: findUser };
};

const findUserByName = async (userName) => {
    const findUser = await userModel.findUserByName(userName);

    return { status: 'SUCCESSFUL', data: findUser };
};

module.exports = {
    createUsers,
    findUserByName,
    getByUserId,
};
