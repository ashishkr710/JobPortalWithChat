import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ChatRoom from './ChatRoom';

class Userdetails extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public gender!: string;
    public contact!: string;
    public role!: number;
    public resume!:string | null;
    public hobbies!:string
    public isLoggedIn!:boolean
    public profileImg!:string | null;
    public agencyId!: number | null;
    public status!:string;
}

Userdetails.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hobbies: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agencyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status:{
            type:DataTypes.STRING,
            defaultValue:'pending'
        }
        
    },
    {
        sequelize,
        modelName: 'Userdetails',
    }
);

Userdetails.hasMany(Userdetails, { foreignKey: 'agencyId', as: 'JobSeekers' });
Userdetails.belongsTo(Userdetails, { foreignKey: 'agencyId', as: 'Agency' }); 

//Chat Room Assosion
Userdetails.hasMany(ChatRoom, { foreignKey: 'agencyId', as: 'agencyChatRooms' });
Userdetails.hasMany(ChatRoom, { foreignKey: 'jobSeekerId', as: 'jobSeekerChatRooms' });

export default Userdetails;