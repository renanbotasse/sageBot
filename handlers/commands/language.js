const { bot, User } = require("../../bot/index");

async function languageCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageText = "Please select your preferred language by clicking on one of the flags below:";
    
    // Send message with emoji flags
    bot.telegram.sendMessage(chatId, messageText, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '🇬🇧 English', callback_data: 'en' },
                    { text: '🇧🇷 Portuguese', callback_data: 'pt' },
                    { text: '🇪🇸 Spanish', callback_data: 'es' }
                ]
            ]
        }
    });
}

async function handleLanguageCallback(ctx) {
    const userId = ctx.from.id;
    const languageCode = ctx.update.callback_query.data;
    
    try {
        let user = await User.findOne({ id: userId }).exec();
        
        if (user) {
            // Update user's language preference
            user.language = languageCode;
            await user.save();
            bot.telegram.sendMessage(ctx.chat.id, "Your language preference has been fine-tuned. Excellent choice! 🌟");
        } else {
            bot.telegram.sendMessage(ctx.chat.id, "Looks like We're searching for a needle in a haystack! User not found. 🕵️‍♀️");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(ctx.chat.id, "Whoopsie daisy! Looks like we've hit a snag. My circuits might need a little tweaking. 🤖💥");
    }
}

module.exports = { languageCommand, handleLanguageCallback };
