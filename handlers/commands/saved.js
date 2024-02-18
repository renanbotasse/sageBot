const { bot, User } = require('../../bot/index');

async function savedListCommand(ctx) {
    const chatId = ctx.chat.id;

    try {
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            let message = "Here are the items you've saved:\n";
            if (user.lists.length > 0) {
                message += "\nSaved List:\n";
                for (let list of user.lists) {
                    message += `- ${list.text}\n`;
                }
            }
            bot.telegram.sendMessage(chatId, message);
        } else {
            bot.telegram.sendMessage(chatId, "User not found. Don't worry, I'll keep searching until I find what you need! 💪");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Failed to retrieve saved items. Something seems to be amiss.");
    }
}

async function savedLinkCommand(ctx) {
    const chatId = ctx.chat.id;
    try {
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            if (user.links.length > 0) {
                let message = "Here are your saved links:\n";
                for (let link of user.links) {
                    message += `- ${link.text}\n`;
                }
                bot.telegram.sendMessage(chatId, message);
            } else {
                bot.telegram.sendMessage(chatId, "You haven't saved any links yet.");
            }
        } else {
            bot.telegram.sendMessage(chatId, "User not found.");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Failed to retrieve saved links. Please try again later.");
    }
}

async function savedTaleCommand(ctx) {
    const chatId = ctx.chat.id;
    try {
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            if (user.tales.length > 0) {
                let message = "Here are your saved tales:\n";
                for (let tale of user.tales) {
                    message += `- ${tale.text}\n\n`;
                    console.log(message)
                }
                bot.telegram.sendMessage(chatId, message);
            } else {
                bot.telegram.sendMessage(chatId, "Oops! It looks like there are no saved stories yet.");
            }
        } else {
            bot.telegram.sendMessage(chatId, "User not found.");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Failed to retrieve saved tales. Please try again later.");
    }
}

module.exports = { savedListCommand, savedLinkCommand, savedTaleCommand };
