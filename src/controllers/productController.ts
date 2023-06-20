import { Request,Response } from 'express'
import { addProductSchema, alterProductSchema } from '../validations/product';
import { Product } from '../models/product';

interface productInterface{
    id?:number,
    name:string,
    description:string,
    price:number
}

export const getAllProducts = async(req:Request,res:Response)=>{
    const results = await Product.findAll();
    res.json(results);
}

export const addProduct = async(req:Request,res:Response)=>{
    try{
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
            res.json('O Produto '+productData.name+ ' foi cadastrado com sucesso');
        }else{
            res.json('O Produto '+productData.name+ ' ja foi cadastrado');
        }
    }catch(error){
        res.json(error);
    }
}

export const alterProduct = async(req:Request,res:Response)=>{
    try{
        const productData:productInterface={
            id: parseInt(req.body.id),
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
        }

        await alterProductSchema.validate(productData);

        const results = await Product.findAll({where:{id:productData.id}})
        if(results.length===1){
            const product = results[0];
            product.name = productData.name;
            product.description = productData.description;
            product.price = productData.price;
            
            await product.save();
            res.json('O Produto '+productData.name+ ' foi alterado com sucesso');
        }else{
            res.json('O Produto '+productData.name+ ' foi não foi encontrado');
        }
    }catch(error){
        res.json(error);
    }
}

export const deleteProduct = async(req:Request,res:Response)=>{
    try{
        const id = parseInt(req.body.id);
        const results = await Product.findAll({where:{id:id}})
        if(results.length==1){
            const product = results[0];
            await product.destroy();
            res.json('O produto '+product.name+' foi deletado com sucesso');
        }else{
            res.json('Não foi possivel localizar o produto');
        }
    }catch(error){
        res.json("o ID é obrigatório");
    }
}