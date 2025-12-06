const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

function extractToken(bearerToken) {
    return bearerToken.split(' ')[1];
}

const isBodyValid = (username, pass) => username && pass;

const createUsers = async (req, res) => {
    const user = req.body;

    const { status, data } = await userService.createUsers(user);

    return res.status(mapStatusHTTP(status)).json(data);
};

const userLogin = async (req, res) => {
    const { userName, password } = req.body;
    
    if (!isBodyValid(userName, password)) {
        return res.status(mapStatusHTTP('ANAUTHORIZED'))
        .json({ message: 'É necessário usuário e senha para fazer login' });
    }

    const user = await userService.findUserByName(userName);

    if (!user || user.data.password !== password) {
        return res.status(mapStatusHTTP('ANAUTHORIZED'))
        .json({ message: 'Usuário não existe ou senha inválida' });
    }

    /* Criamos uma config básica para o nosso JWT, onde:
    expiresIn -> significa o tempo pelo qual esse token será válido;
    algorithm -> algoritmo que você usará para assinar sua mensagem
    (lembra que falamos do HMAC-SHA256 lá no começo?). */

    // A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias.
    const jwtConfig = {
      expiresIn: '1m',
      algorithm: 'HS256',
    };

    /* Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
      Mensagem essa que contém dados do seu usuário e/ou demais dados que você
      quiser colocar dentro de "data".
      O resultado dessa função será equivalente a algo como: 
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
      .eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6Iml0YWxzc29kaiIsInBhc3N3b3JkIjoic2VuaGExMjMifSwiaWF0IjoxNjM4OTc1MTMyLCJleHAiOjE2Mzk1Nzk5MzJ9
      .hnpmu2p61Il8wdQfmUiJ7wiWXgw8UuioOU_D2RnB9kY */
    let token = '';

    if (user.data.userName === 'admin' && user.data.password === 's3nh4S3gur4???') {
        token = jwt.sign({ data: { userId: user.data.id, name: user.data.userName, admin: true }}, secret, jwtConfig);
    } else {
        token = jwt.sign({ data: { userId: user.data.id, name: user.data.userName, admin: false }}, secret, jwtConfig);
    }
    

    /* Por fim, nós devolvemos essa informação ao usuário. */
    res.status(mapStatusHTTP('SUCCESSFUL')).json({ token });
};

const findByMe = async (req, res) => {
    const authorizationToken = req.headers['authorization'];
    
    if (!authorizationToken) {
        return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ error: { message: 'Token not found' } });
    }

    /* Utilizamos a função para extrair o token */
    const token = extractToken(authorizationToken);

    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, secret);

    return res.status(mapStatusHTTP('SUCCESSFUL')).json({ username: decoded.data.name, admin: decoded.data.admin });
};

const findSecret = async (_req, res) => {
    res.status(mapStatusHTTP('SUCCESSFUL')).json({ secretInfo: 'Peter Parker é o Homem-Aranha' });
};

module.exports = {
    createUsers,
    userLogin,
    findByMe,
    findSecret,
};