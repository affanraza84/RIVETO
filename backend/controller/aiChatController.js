import { getReply } from "../config/openRouter.js";


export const response = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const aiResponse = await getReply({ prompt: message });

    console.log("AI RAW RESPONSE:", aiResponse);

    let parsedResponse;

    if (typeof aiResponse === "string") {
      try {
        parsedResponse = JSON.parse(aiResponse);
      } catch {
        parsedResponse = {
          type: "chat",
          message: aiResponse,
        };
      }
    } else {
      parsedResponse = aiResponse;
    }

    return res.status(200).json(parsedResponse);

  } catch (error) {
    console.error("AI response error:", error);

    return res.status(500).json({
      type: "chat",
      message: "Internal Server Error",
    });
  }
};