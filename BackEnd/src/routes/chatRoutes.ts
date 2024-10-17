// routes/chatRoutes.ts
import { Router } from 'express';
import { sendMessage, getMessages } from '../controller/ChatController';

const router = Router();

router.post('/send', sendMessage);
router.get('/:chatRoomId', getMessages);

export default router;