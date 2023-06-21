import { Request, Response } from 'express'

export const teste = (req:Request,res:Response)=>{

   const teste= require('crypto').randomBytes(64).toString('hex')
    res.send(teste)
}