import jwt from 'jsonwebtoken';

type tokenType = {
    userId: string,
    name: string,
    email: string,
    isAdmin: boolean,
    iat: number,
    exp: number
};

const userId = async (token: string) => {
    // token = token.replace('Bearer ', '')[0].toString();
    let t = token.split(' ');
    token = t[1];
    console.log("🚀 ~ file: userid-token.ts:14 ~ userId ~ token:", token)
    let decodedToken = jwt.decode(token) as tokenType;
    console.log("🚀 ~ file: userid-token.ts:15 ~ userId ~ decodedToken:", decodedToken)
    return decodedToken.userId;
};

export default userId;