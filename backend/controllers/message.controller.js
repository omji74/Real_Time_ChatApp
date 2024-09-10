import { Error } from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res)=>{
    try{
        const {message} = req.body;
        const {_id: receiverId} = req.params;
        const senderId = req.user_id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
        }

        const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
        res.status(201).json(newMessage);
    }
    catch(err){

        console.log("Error message from sendmessagecontroller",err.message);

        res.status(500).json({err:"Internal Server Error"})
    }

}


