import * as jwt from 'jsonwebtoken';

function newTokenCreator(phoneEmail): string {
    return jwt.sign({
        exp: Math.floor(Date.now() / Number.parseInt(process.env.MS)) + Number.parseInt(process.env.TOKEN_TTL),
        phoneEmail,
    }, process.env.SECRET_KEY);
}

function tokenValidator(token) {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export default {newTokenCreator, tokenValidator};
