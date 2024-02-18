const { bot } = require('../../bot/index');

async function unmatchedCommand(ctx) {
    const chatId = ctx.chat.id;

    try {
        // Respond with a message indicating that the command was not recognized
        await bot.telegram.sendMessage(chatId, "Sorry, I didn't quite catch that command. Could you please try again or ask for help? I'm here to assist you! 🤖💬");
    } catch (err) {
        console.error(err);
        // Handle any errors that occur during the process
        await bot.telegram.sendMessage(chatId, "Oops! Something went wrong.");
    }
}

module.exports = unmatchedCommand;
