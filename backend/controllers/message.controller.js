import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
// import protectRoute from "../middleware/protectRoute.js";

import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try{
        const {message} = req.body;
		console.log(req.body);
        const {id: receiverId} = req.params;
		
        const senderId = req.user._id;
		console.log(senderId)

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
     

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
		res.status(201).json(newMessage);
    }
    catch(err){

        console.log("Error message from sendmessagecontroller",err.message);

        res.status(500).json({err:"Internal Server Error"})
    }


}
export const getMessage  = async (req,res)=>{
	try{
		const {id:userToChatId} = req.params;
		const senderId = req.user._id;
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
 
	}
	catch(err){

        console.log("Error message from getmessagecontroller",err.message);

        res.status(500).json({err:"Internal Server Error"})
    }

	
}


