import lmsCollection from "../Model/model.js";
import Meme from "../Model/memeModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config()
const generateToken = (id) => {
     return jwt.sign({id},process.env.JSON_WEB,{expiresIn:"1h"})
}

export const signup = async (req , res) => {
    const { name, email, password } = req.body;
    try {
        
        
        const user = await lmsCollection.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new lmsCollection(
            {
                name:name,
                email:email,
                password:hashedPassword
            }
        )
await newUser.save()
res.json({
            message: "Signup successful",
            user: {
                _id:newUser.id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            },
            jwt:generateToken(newUser._id)
 })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const adminUser = new lmsCollection({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });
        await adminUser.save();
        res.json({ message: 'Admin created successfully', user: { name, email, role: 'admin' } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const populateMemes = async (req, res) => {
    try {
        const memes = [
            {
                title: "Exam Stress 😵💫",
                imageUrl: "https://i.imgflip.com/1bij.jpg",
                topText: "When exams are tomorrow",
                bottomText: "And you start studying today",
                category: "Student Life",
                likes: 12
            },
            {
                title: "Coding Bug 🐞",
                imageUrl: "https://i.imgflip.com/26am.jpg",
                topText: "Code works perfectly",
                bottomText: "Until you submit it",
                category: "Programming",
                likes: 25
            },
            {
                title: "Monday Mood 😴",
                imageUrl: "https://i.imgflip.com/9ehk.jpg",
                topText: "Monday morning",
                bottomText: "After weekend sleep",
                category: "Work Life",
                likes: 8
            }
        ];
        await Meme.insertMany(memes);
        res.json({ message: "Memes populated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMemes = async (req, res) => {
    try {
        const memes = await Meme.find().sort({ createdAt: -1 });
        res.json(memes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const totalMemes = await Meme.countDocuments();
        const totalUsers = await lmsCollection.countDocuments();
        const totalLikes = await Meme.aggregate([{ $group: { _id: null, total: { $sum: "$likes" } } }]);
        
        res.json({
            totalMemes,
            totalUsers,
            totalDownloads: totalLikes[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await lmsCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JSON_WEB || "fallback_secret");
        
        res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};