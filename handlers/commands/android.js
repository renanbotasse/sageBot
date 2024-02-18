const { bot } = require("../../bot/index");

async function androidCommand(ctx) {
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Sage is a chatbot designed for Telegram, built using Node.js.\n\n Her purpose is to serve as a tool for users to discover random facts and research various topics using the Wikipedia API.\n\nThrough the Cohere API, Sage has been endowed with AI response capabilities and the ability to create stories.\n\nSearches, random facts, and stories can be saved on a MongoDB server.\n\nAll of this was created by me, Renan Botasse, and you can check my code directly from my repository at https://github.com/renanbotasse/sageBot"
    );
}
module.exports = androidCommand;
