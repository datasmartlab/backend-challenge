import { Request, Response } from 'express'
import { addUserSchema, signInUserSchema } from '../validations/user';
import bcrypt from 'bcrypt'
import { User } from '../models/user';
import { generateAccessToken } from '../validations/token';

interface userInterface{
    id?:number,
    name?:string,
    email:string,
    password:string
}

export const  createUser = async (req:Request, res:Response)=>{
    try{
        const userData:userInterface={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        await addUserSchema.validate(userData)
        const results = await User.findAll({where:{email:userData.email}})
        if(results.length<1){
            userData.password = encrypt(userData.password)
            const user = User.build({
                name:userData.name,
                email:userData.email,
                password:userData.password
            })
            await user.save();
            res.status(201).json('Usuário Criado com sucesso')
        }else{
            res.status(409).json('Esse email ja esta cadastrado');
        }
    }catch(error){
        return res.status(400).json(error)
    }
}
export const signInUser = async(req:Request,res:Response)=>{
    try{
        const userData:userInterface={
            email:req.body.email,
            password:req.body.password
        }

        await signInUserSchema.validate(userData);

        const results = await User.findAll({ where:{ email:userData.email } })

        if(results.length==1){
            const comparation=await bcrypt.compare(userData.password, results[0].password);
            if(comparation){
                const token = generateAccessToken(userData.email,userData.password);
                res.json({message:'Usuario logado com sucesso', token:token});
            }else{
                res.status(400).json('Senha incorreta')
            }
        }else{
            res.json('Email não encontrado');
        }
    }catch(error){
        res.status(500).json(error)
    }
}
function encrypt(password:string){
    const saltRounds = 14;
    const myPlaintextPassword = password;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(myPlaintextPassword, salt);
}
