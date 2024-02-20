const { bot, User } = require('../../bot/index');

async function deleteCommand(ctx) {
    const chatId = ctx.chat.id;
    const itemIdToDelete = ctx.update.message.text.split("_")[1];
    try {
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            let deleted = false;
            ['links', 'tales', 'lists'].forEach(async (type) => {
                const index = user[type].findIndex(item => item.messageId === itemIdToDelete);
                if (index !== -1) {
                    user[type].splice(index, 1);
                    deleted = true;
                }
            });
            if (deleted) {
                await user.save();
                bot.telegram.sendMessage(chatId, "Piece of cake! Item successfully vaporized. 😎");
            } else {
                bot.telegram.sendMessage(chatId, "Looks like that item slipped through our fingers! 🤷‍♀️ I did not find the item");
            }
        } else {
            bot.telegram.sendMessage(chatId, "User not found. Are We playing hide and seek? 😶‍🌫️");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Failed to delete the item. Oh well, not the end of the world! Let's give it another shot later. 😉");
    }
}

module.exports = deleteCommand ;
