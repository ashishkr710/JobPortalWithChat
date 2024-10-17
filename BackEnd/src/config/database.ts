import { Sequelize } from 'sequelize';
import Userdetails from '../models/Userdetails';
import ChatMessage from '../models/ChatMessage';
import ChatRoom from '../models/ChatRoom';

const sequelize = new Sequelize('jobWithChat', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true,
});


 // Define associations
// Userdetails.hasMany(ChatMessage, { foreignKey: 'senderId', as: 'messages' });
// ChatMessage.belongsTo(Userdetails, { foreignKey: 'senderId', as: 'sender' });

// ChatRoom.hasMany(ChatMessage, { foreignKey: 'chatRoomId', as: 'messages' });
// ChatMessage.belongsTo(ChatRoom, { foreignKey: 'chatRoomId', as: 'chatRoom' });
 

Userdetails.sync();
ChatRoom.sync();
ChatMessage.sync();


export default sequelize;