const { bot } = require('../../bot/index');

async function unmatchedCommand(ctx) {
    const chatId = ctx.chat.id;

    try {
        await bot.telegram.sendMessage(chatId, "Sorry, I didn't quite catch that command. Could you please try again or ask for help? I'm here to assist you! 🤖💬");
    } catch (err) {
        console.error(err);
        await bot.telegram.sendMessage(chatId, "Oops! Something went wrong.");
    }
}

module.exports = unmatchedCommand;
