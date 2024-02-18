const { bot, User } = require("../../bot/index");

async function startCommand(ctx) {
    const userId = ctx.update.message.from.id;
    const userName = ctx.update.message.from.first_name + " " + ctx.update.message.from.last_name;
    const userLanguage = ctx.update.message.from.language_code;
    try {
        let user = await User.findOne({ id: userId }).exec();
        
        if (!user) {
            const newUser = new User({
                id: userId,
                language: userLanguage,
                username: userName,
                lists: [],
                links: [],
                tales: []
            });
            await newUser.save();
            bot.telegram.sendMessage(ctx.chat.id, `Welcome ${userName}!\n\nYour profile has been created ${userId}.\n\nI am Sage, an android designed to be a companion 💚. `);
        } else {
            bot.telegram.sendMessage(ctx.chat.id, `Hello ${userName}! Your profile already exists.`);
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(ctx.chat.id, "Sorry, an error occurred while processing your request.");
    }
}
module.exports = startCommand;
