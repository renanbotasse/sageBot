const { bot, User } = require("../../bot/index");
const axios = require("axios");
const randomCommand = require("./random");

async function searchCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageId = ctx.update.message.message_id;

    if (ctx.update.message.text === "/search") {
        randomCommand(ctx);
    } else {
        const searchQuery = ctx.message.text.split(" ").slice(1).join(" ");
        axios
            .get(
                `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchQuery}&format=json&callback=?`
            )
            .then(async (response) => {
                const searchData = JSON.parse(
                    response.data.substring(5, response.data.length - 1)
                );
                const topics = searchData[1];
                const urls = searchData[3];
                let message = "Do you want to know about some of these topics?\n\n";
                for (let i = 0; i < topics.length; i++) {
                    message += `[${topics[i]}](${urls[i]})\n`;
                }
                let messageWithSaveOption = `${message}\n\nTo save this list, use /save_list_${messageId}`;
                let user = await User.findOne({ id: chatId }).exec();
                if (user) {
                    let savedMessage = { messageId: messageId, text: messageWithSaveOption };
                    user.backupMessages.push(savedMessage);
                    await user.save();
                }
                bot.telegram.sendMessage(chatId, messageWithSaveOption);
            })
            .catch((error) => {
                bot.telegram.sendMessage(
                    chatId,
                    "Oh, it seems like I couldn't search for new facts for you at the moment. No worries though, let's try again later! If there's anything else you'd like to know or discuss, just let me know."
                );
            });
    }
}
module.exports = searchCommand;
