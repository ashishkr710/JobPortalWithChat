import { Request, Response, NextFunction } from 'express';
var jwt = require('jsonwebtoken');


export const authorizeUser = async (req: any, res: any, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Wrong token provided' });
        }

        const decoded: any = jwt.verify(token, "secret_key");
        const userId = decoded.id;

        req.userId = userId;

        const requestedUserId = parseInt(req.params.userId, 10);
        if (requestedUserId && requestedUserId !== userId) {
            return res.status(403).json({ message: 'You do not have access to this resource' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};
