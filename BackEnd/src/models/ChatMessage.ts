import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Ensure this is correctly configured

import ChatRoom from './ChatRoom';

class ChatMessage extends Model {
    public id!: string;
    public chatRoomId!: string;
    public senderId!: string;
    public message!: string;
    public createdAt!: Date;
    public updatedAt!: Date; // Added updatedAt field
}

ChatMessage.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    chatRoomId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: { // Added updatedAt field configuration
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize, // Ensure the Sequelize instance is passed here
    modelName: 'ChatMessage',
    timestamps: true, // Ensure timestamps are enabled
});

// Associations
ChatMessage.belongsTo(ChatRoom, { foreignKey: 'chatRoomId', as: 'chatRoom' });

export default ChatMessage;