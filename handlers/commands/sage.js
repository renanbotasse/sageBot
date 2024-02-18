const { bot, cohere } = require("../../bot/index");
const chatbotPrompts = require("../../constant/chatbotPrompts");

async function sageCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageText = ctx.message.text + "Answer with less than 100 words";
    let concatenatedResponse = ""; // Initialize an empty string to accumulate the response
    if (ctx.message.text === "/sage") {
        bot.telegram.sendMessage(chatId, chatbotPrompts.greeting);
    } else {
        try {
        // Send message to Cohere AI using the cohere instance
            const chatStream = await cohere.chatStream({
                model: "command-light",
                promptTruncation: "AUTO",
                citationQuality: "accurate",
                documents: [],
                chatHistory: [{ role: "CHATBOT", message: chatbotPrompts.sage }],
                message: messageText,
                connectors: [
                { id: "web-search", options: { site: "https://en.wikipedia.org/" } },
                ], // Other parameters as needed
            });
        // Listen for responses from Cohere AI
            for await (const message of chatStream) {
                if (message.eventType === "text-generation") {
                    concatenatedResponse += message.text; // Concatenate the text from each message
                }
            }
        bot.telegram.sendMessage(chatId, concatenatedResponse);
    } catch (error) {
        bot.telegram.sendMessage(
        chatId,
        "Apologies, it seems there was a hiccup while processing your request. Please try again later! 🤖🛠️"
        );
    }
    }
}

module.exports = sageCommand;
