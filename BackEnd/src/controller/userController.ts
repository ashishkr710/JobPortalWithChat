// controllers/UserController.ts
import { Request, Response } from 'express';
import Userdetails from '../models/Userdetails';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import { sendWelcomeEmail } from '../mail/nodemailerConfig';
import { v1 as uuidv1 } from 'uuid';
import ChatRoom from '../models/ChatRoom';
dotenv.config();


export const check = (req: Request, res: Response) => {
    res.send("Hello world")
}

export const getAgencies = async (req: Request, res: Response):Promise<void> => {
    try {
        const agencies = await Userdetails.findAll({
            where: { role: 2 }, 
            attributes: ['id', 'firstName', 'lastName','email','gender','contact','hobbies','profileImg'], // Select only needed fields
        });
         res.json(agencies);
         return
    } catch (error:any) {
        console.error('Error fetching agencies:', error);
         res.status(500).json({ message: 'Server error', error: error.message });
         return
    }
};


export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, gender, contact, role, agencyId , hobbies} = req.body;

        if (!firstName || !lastName || !email || !gender || !contact || role === undefined) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const existingUser = await Userdetails.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: 'Email already exists' });
            return;
        }
        const files: any = req?.files;
        const imgPath = files['profileImg'] ? files['profileImg'][0].path : null;
        const resumePath = files['resume'] ? files['resume'][0].path : null;

        // const autogeneratedPassword = uuidv1();
        const autogeneratedPassword = '1234567890';
        const hashedPassword = await bcrypt.hash(autogeneratedPassword, 10);

        const user = await Userdetails.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            contact,
            hobbies,
            role, 
            // profileImg: role === '1' ? imgPath : null, 
            profileImg: imgPath, 
            resume: role === '1' ? resumePath : null, 
            agencyId: role === '1' ? agencyId : null
        });
        await sendWelcomeEmail(user.email, user.firstName,autogeneratedPassword);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




export const userDetails = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token format
        if (!token) {
             res.status(401).json({ message: 'No token provided' });
             return
        }

        const decoded: any = jwt.verify(token, "secret_keu");
        const userId = decoded.id;
    // const userId = parseInt(req.params.userId, 10);

    try {
        const jobSeeker = await Userdetails.findOne({
            where: { id: userId, role: 1 }, 
            include: [{
                model: Userdetails,
                as: 'Agency',
                attributes: ['id', 'firstName', 'lastName','email','profileImg','contact','gender'],
            }]
        });

        if (jobSeeker) {
            res.json(jobSeeker);
            return;
        }
        const agency = await Userdetails.findOne({
            where: { id: userId, role: 2 }, 
            attributes: ['id', 'firstName', 'lastName','email','profileImg','gender'],
            include: [{
                model: Userdetails,
                as: 'JobSeekers', 
                where: { role: 1 },
                attributes: ['id', 'firstName', 'lastName','email','contact','resume','profileImg','gender'],
                required: false, 
            }]
        });

        if (agency) {
            res.json(agency);
            return;
        }

        res.status(404).json({ message: 'User not found' });
        return;

    } catch (error: any) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
        return;
    }
};



export const loginUser = async (req:Request, res:Response):Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await Userdetails.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user.id }, "secret_keu", { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, userId: user.id });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const acceptJobSeeker = async (req: Request, res: Response): Promise<void> => {
    const { agencyId, jobSeekerId } = req.body;

    try {
        // Update job seeker status
        await Userdetails.update({ status: 'accepted' }, { where: { id: jobSeekerId } });

        // Create a new chat room
        const chatRoom = await ChatRoom.create({ agencyId, jobSeekerId });

        res.json({ message: 'Job seeker accepted', chatRoom });
    } catch (error: any) {
        console.error('Error accepting job seeker:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
