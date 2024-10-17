import { Request, Response } from 'express';
import ChatMessage from '../models/ChatMessage';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    const { chatRoomId, senderId, message } = req.body;

    try {
        const chatMessage = await ChatMessage.create({ chatRoomId, senderId, message });
        res.json(chatMessage);
    } catch (error: any) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    const { chatRoomId } = req.params;

    try {
        const messages = await ChatMessage.findAll({ where: { chatRoomId } });
        res.json(messages);
    } catch (error: any) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};