const axios = require("axios");
const { bot, User } = require("../../bot/index");

async function randomCommand(ctx) {
    if (ctx.message.text === "/random" || ctx.message.text === "/search") {
        console.log(ctx.update.message.message_id);
        try {
            const response = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
            const title = response.data.title;
            const extract = response.data.extract;
            const page = response.data.content_urls.desktop.page;
            const message = `Here's an interesting fact for you: *${title}*\n\n${extract} \n\nFascinating, isn't it? If you want to learn more this you can read [here](${page})`;
            const messageWithSaveOption = `${message}\n\nTo save this link, use /save_link_${ctx.update.message.message_id}`;

            // Save the message to the backup database
            let user = await User.findOne({ id: ctx.chat.id }).exec();
            if (user) {
                let savedMessage = { messageId: ctx.update.message.message_id, text: messageWithSaveOption };
                user.backupMessages.push(savedMessage);
                await user.save();
            }

            bot.telegram.sendMessage(ctx.chat.id, messageWithSaveOption);
        } catch (error) {
            console.error("Error fetching random fact:", error);
            bot.telegram.sendMessage(
                ctx.chat.id,
                "Oh, it seems like I couldn't find a random fact for you at the moment. No worries though, let's try again later! If there's anything else you'd like to know or discuss, just let me know."
            );
        }
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "Sorry, if you want to discover a new fact, just tap /random"
        );
    }
}

module.exports = randomCommand;
