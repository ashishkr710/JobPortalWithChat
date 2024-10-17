// models/ChatRoom.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Userdetails from './Userdetails';
import ChatMessage from './ChatMessage';

class ChatRoom extends Model {
    public id!: string;
    public agencyId!: string;
    public jobSeekerId!: string;
}

ChatRoom.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    agencyId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobSeekerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ChatRoom',
});

ChatRoom.belongsTo(Userdetails, { foreignKey: 'agencyId', as: 'agency' });
ChatRoom.belongsTo(Userdetails, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });
ChatRoom.hasMany(ChatMessage, { foreignKey: 'chatRoomId', as: 'messages' });


export default ChatRoom;