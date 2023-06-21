import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../migrations/mysql';

interface userInterface extends Model{
    id:number,
    name:string,
    email:string,
    password:string
}

export const User = sequelize.define<userInterface>(
    'userData',{
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
    },
    {
        tableName: 'user',
        timestamps: false,
    }
)

// sequelize.sync();