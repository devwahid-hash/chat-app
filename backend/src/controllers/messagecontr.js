import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";



export const sendMessage = async (req, res) => {
    const { reciver } = req.params;
    const { message } = req.body;
    const sender = req.userId;

    try {
        let conversation = await Conversation.findOne({
            members: { $all: [sender, reciver] }
        });

        const newMessage = await Message.create({
            sender,
            reciver,
            message,
        });

        if (conversation) {
            await Conversation.findOneAndUpdate(
                { members: { $all: [sender, reciver] } },
                { $push: { messages: newMessage._id } }
            );
        } else {
            await Conversation.create({
                members: [sender, reciver],
                messages: [newMessage._id]
            });
        }

        const populatedMessage = await Message.findById(newMessage._id)
            .populate("sender", "userName profilePic _id")
            .populate("reciver", "userName profilePic _id");

        return res.status(200).json(populatedMessage);
    } catch (error) {
        return res.status(500).json({ message: `error in sendMessage: ${error}` });
    }
};

export const getMessages = async (req, res) => {
    const sender = req.userId;
    const { reciver } = req.params;
    
    try {
        const messages = await Message.find({
            $or: [
                { sender: sender, reciver: reciver },
                { sender: reciver, reciver: sender }
            ]
        })
        .populate("sender", "userName profilePic _id")
        .populate("reciver", "userName profilePic _id")
        .sort({ createdAt: 1 });

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: `error in getMessages: ${error}` });
    }
};

