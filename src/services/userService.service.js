const { userModel } = require('../models');

const createUsers = async (user) => {
    const userId = await userModel.createUsers(user);
    const findUser = await userModel.findUserByid(userId);

    return { status: 'CREATED', 
        data: { message: 'Novo usuário criado com sucesso', user: findUser } };  
};

module.exports = {
    createUsers,
};
