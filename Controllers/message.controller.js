const Message = require("../models/Message");
const User = require("../models/User");

exports.createMessage = async (req, res) => {
  try {
    if (!req?.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { text, authorId, recipientId } = req.body;
    if (!text || !authorId || !recipientId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const author = await User.findById(authorId);
    if (!author) {
      return res.status(400).json({ message: "Author user not found" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ message: "Recipient user not found" });
    }

    const newMessage = new Message({
      text,
      author: authorId,
      recipient: recipientId,
    });
    await newMessage.save();
    console.log(newMessage);

    // When I implement the messaging feature on the frontend, ensure the following:
    // User Identification: On the user profile page, have the user's ID available (e.g., from the profile data fetched). This ID should be sent as the recipientId when creating a message.
    // Message Composition: Provide a UI component (like a form) for writing and sending messages. This form should submit both the text of the message and the recipientId.
    // API Integration: Make sure your frontend correctly calls your backend API with the necessary data (authorId, recipientId, and text).

    return res
      .status(200)
      .json({ message: "Message created", data: newMessage });
  } catch (error) {
    console.error("Error creating message:", error);
    return res
      .status(500)
      .json({ message: "Failed to create Message", error: error.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const message = await Message.findById(_id);
    if (!message) {
      return res.status(404).json({ message: "Message not found"})
    }
    console.log("message", message)
    return res
      .status(200)
      .json({ message: "Message retrieved", data: message });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve Message", error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const message = await Message.findByIdAndDelete(_id);
    if (!message) {
      return res.status(404).json({ message: "Message not found"})
    }
    return res.status(200).json({ message: "Message deleted" })

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete Message", error: error.message });
  }
};
