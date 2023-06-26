import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../migrations/mysql';

interface productData extends Model{
    id:number,
    name:string,
    description:string,
    price:Number
}

export const Product = sequelize.define<productData>(
    "productData",{
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.FLOAT
        }
    },
    {
        tableName: "product",
        timestamps: false,
    }
)

// sequelize.sync();