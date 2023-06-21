import { Request,Response } from 'express'
import { addProductSchema, alterProductSchema } from '../validations/product';
import { Product } from '../models/product';
import { validateToken } from '../validations/token';

interface productInterface{
    id?:number,
    name:string,
    description:string,
    price:number
}

export const getAllProducts = async(req:Request,res:Response)=>{
    try{
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if(validateToken(token)){
            const results = await Product.findAll();
            if(results.length>0){
                res.json(results);
            }else{
                res.json('Não tem nenhum produto cadastrado');
            }
            
            
        }else{
            res.status(401).json('Token inválido');
        }
    }catch(error){
        res.status(400).json(error);
    }
}

export const addProduct = async(req:Request,res:Response)=>{
    try{
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if(validateToken(token)){
        const productData:productInterface={
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
        }

        await addProductSchema.validate(productData);

        const results = await Product.findAll({where:{name:productData.name}})
        if(results.length<1){
            const product = Product.build({
                name:productData.name,
                description:productData.description,
                price:productData.price
            })
            await product.save();
            res.status(201).json('O Produto ' +productData.name+ ' foi cadastrado com sucesso');
        }else{
            res.status(409).json('O Produto ' +productData.name+ ' ja foi cadastrado');
        }
        }
        else{
            res.status(401).json('Token inválido');
        }
    }catch(error){
        res.status(400).json(error);
    }
}

export const alterProduct = async(req:Request,res:Response)=>{
    try{
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if(validateToken(token)){
            const productData:productInterface={
                id: parseInt(req.body.id),
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
            }

            await alterProductSchema.validate(productData);

            const results = await Product.findAll({where:{id:productData.id}})
            if(results.length==1){
                const product = results[0];
                product.name = productData.name;
                product.description = productData.description;
                product.price = productData.price;
                
                await product.save();
                res.json('O Produto '+productData.name+ ' foi alterado com sucesso');
            }else{
                res.status(404).json('O Produto não foi encontrado');
            }
        }else{
            res.json('Token inválido');
        }
    }catch(error){
        res.status(400).json(error);
    }
}

export const deleteProduct = async(req:Request,res:Response)=>{
    try{
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if(validateToken(token)){
            const id = parseInt(req.body.id);
            const results = await Product.findAll({where:{id:id}})
            if(results.length==1){
                const product = results[0];
                await product.destroy();
                res.json('O produto '+product.name+' foi deletado com sucesso');
            }else{
                res.status(404).json('Não foi possivel localizar o produto');
            }
        }else{
            res.status(404).json('Token inválido')
        }
    }catch(error){
        res.status(400).json("o ID é obrigatório");
    }
}


