import { Request, Response } from 'express'
import userSchema from '../validations/user';
import bcrypt from 'bcrypt'
import { User } from '../models/user';
import jwt from 'jsonwebtoken'

export const  createUser = async (req:Request, res:Response)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const userData={name:name,email:email,password:password}

        await userSchema.validate(userData)
        userData.password=encrypt(password)
        const user=User.build({
            name:userData.name,
            email:userData.email,
            password:userData.password
        })
        await user.save();
        res.send('Usuário Criado com sucesso ')
    }catch(error){
        res.send(error)
    }
}

function encrypt(password:string){
    const saltRounds = 14;
    const myPlaintextPassword = password;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(myPlaintextPassword, salt);
}

function generateAccessToken(username:string,userpassword:String) {
    return jwt.sign({ name:username,password:userpassword }, process.env.TOKEN_SECRET as string, { expiresIn: '1800s' });
}