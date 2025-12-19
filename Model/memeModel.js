import mongoose from "mongoose";

const memeSchema = mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    topText: { type: String, required: true },
    bottomText: { type: String, required: true },
    category: { type: String, required: true },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Meme = mongoose.model("memes", memeSchema);
export default Meme;