import {OpenRouter} from "@openrouter/sdk";
import dotenv from 'dotenv'
dotenv.config();
const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const getReply = async ({prompt}) => {
  try {
    const response = await client.chat.send({
      chatRequest: {
        model: "deepseek/deepseek-chat-v3.1",
        temperature: 0.2,
        maxTokens: 100,
        messages: [
          {
            role: "system",
            content: `You are RIVETO AI Assistant.
                 Rules:
                    - Keep replies short.
                    - Help users navigate pages.
                    - Return ONLY valid JSON.
                    - If navigation needed:
                    {
                    "type":"navigate",
                    "route":"route_here",
                    "message":"short message"
                    }

                    - If normal chat:
                    {
                    "type":"chat",
                    "message":"reply_here"
                    }

                    Routes:
                    Home=/
                    About=/about
                    Collection=/collection
                    NewArrivals=/new-arrivals
                    BestSellers=/best-sellers
                    Contact=/contact
                    Cart=/cart
                    Order=/order
                    FAQ=/faq
                    PlaceOrder=/placeorder
                    Privacy=/privicypolicy
                    Terms=/termsandservices
                    SizeGuide=/size-guide
                    Cookie=/cookie-policy
                    Contributors=/contributors`,
          },

          {
            role: "user",
            content: prompt,
          },
        ],
      },
    });

    const reply = response.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return reply;
  } catch (e) {
    return {
      type: "chat",
      message: "Something went wrong",
    };
  }
};
