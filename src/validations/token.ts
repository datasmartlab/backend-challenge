import jwt from 'jsonwebtoken'

export function validateToken(token:string|null){
    try {
        if(token!=null){
            jwt.verify(token, process.env.TOKEN_SECRET as string);
            return true
        }
        return false
    } catch(error) {
        return false
    }
}

export function generateAccessToken(username:string,userpassword:String) {
    return jwt.sign({ name:username, password:userpassword }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });
}