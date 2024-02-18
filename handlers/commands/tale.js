const { bot, cohere, User } = require("../../bot/index");
const chatbotPrompts = require("../../constant/chatbotPrompts");

async function taleCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageId = ctx.update.message.message_id;

    try {
        const messageText = "Create a tale for me about: " + ctx.update.message.text + "The history may have a minimum of 100 words and maximum of 1000 words.";
        let concatenatedResponse = "";
        const chatStream = await cohere.chatStream({
            model: "command-light",
            promptTruncation: "AUTO",
            citationQuality: "accurate",
            documents: [],
            chatHistory: [{ role: "CHATBOT", message: chatbotPrompts.tale }],
            message: messageText,
            connectors: [
                { id: "web-search", options: { site: "https://en.wikipedia.org/" } },
            ], // Other parameters as needed
        });
        for await (const message of chatStream) {
            if (message.eventType === "text-generation") {
                concatenatedResponse += message.text; // Concatenate the text from each message
            }
        }
        let taleWithSaveOption = `${concatenatedResponse}\n\nTo save this tale, use /save_tale_${messageId}`;

        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            let savedMessage = { messageId: messageId, text: taleWithSaveOption };
            user.backupMessages.push(savedMessage);
            await user.save();
        }

        bot.telegram.sendMessage(chatId, taleWithSaveOption);
    } catch (error) {
        bot.telegram.sendMessage(
        chatId,
        "Sorry, can You ask for another tale?"
        );
    }
}

module.exports = taleCommand;
