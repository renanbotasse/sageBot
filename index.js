const TelegramBot = require("node-telegram-bot-api");

const token = "6844843388:AAF_bUyerjlQQRNs-JPx9lOMZgrG2fEX4PI"; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === "/start") {
        bot.sendMessage(chatId, "Welcome to the bot!");
    }
});
