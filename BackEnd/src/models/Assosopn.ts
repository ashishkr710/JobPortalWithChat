// import ChatMessage from "./ChatMessage";
// import ChatRoom from "./ChatRoom";
// import Userdetails from "./Userdetails";

// // Userdetails.hasMany(Userdetails, { foreignKey: 'agencyId', as: 'JobSeekers' });
// // Userdetails.belongsTo(Userdetails, { foreignKey: 'agencyId', as: 'Agency' }); 

// // //Chat Room Assosion
// // Userdetails.hasMany(ChatRoom, { foreignKey: 'agencyId', as: 'agencyChatRooms' });
// // Userdetails.hasMany(ChatRoom, { foreignKey: 'jobSeekerId', as: 'jobSeekerChatRooms' });

// // ChatRoom.belongsTo(Userdetails, { foreignKey: 'agencyId', as: 'agency' });
// // ChatRoom.belongsTo(Userdetails, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });
// // ChatRoom.hasMany(ChatMessage, { foreignKey: 'chatRoomId', as: 'messages' });
 
// // ChatMessage.belongsTo(ChatRoom, { foreignKey: 'chatRoomId', as: 'chatRoom' });