const { bot, cohere } = require("../../bot/index");
const chatbotPrompts = require("../../constant/chatbotPrompts");

async function sageCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageText = ctx.message.text + "Answer with less than 100 words";
    let concatenatedResponse = "";
    if (ctx.message.text === "/sage") {
        bot.telegram.sendMessage(chatId, chatbotPrompts.greeting);
    } else {
        try {
            const chatStream = await cohere.chatStream({
                model: "command-light",
                promptTruncation: "AUTO",
                citationQuality: "accurate",
                documents: [],
                chatHistory: [{ role: "CHATBOT", message: chatbotPrompts.sage }],
                message: messageText,
                connectors: [
                { id: "web-search", options: { site: "https://en.wikipedia.org/" } },
                ],
            });
            for await (const message of chatStream) {
                if (message.eventType === "text-generation") {
                    concatenatedResponse += message.text; 
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
