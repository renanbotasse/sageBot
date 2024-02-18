const { bot } = require("../../bot/index");

async function helpCommand(ctx) {
    bot.telegram.sendMessage(
        ctx.chat.id,     
        "/start - Let's embark on this journey together! 🚀\n/random - Explore the depths of my knowledge vault and uncover a surprise! 🤓\n/search - I'm your go-to search companion! Just ask, and I'll find it for you! 🔍\n/sage - I'm ready for a lively chat full of energy and excitement! 💚\n/tale - Ready to embark on an adventure? I've got a treasure trove of thrilling stories waiting for you! 📜\n/help - Need guidance? I'll gladly reveal all my commands! ✨\n/language - Change the language to communicate with me. 🇬🇧🇧🇷🇪🇸\n/save_link - Found an amazing link? Let's save it for later! 📎\n/save_list - Preserve your search results for future reference! 🗒️\n/save_tale - Hold onto that captivating story! I'll keep it safe for you. 📚\n/saved_link - Take a peek at all the links we've saved together. 🔗\n/saved_list - Rediscover all the lists we've compiled. 📋\n/saved_tale - Revisit the captivating stories we've shared. 📖\n/delete_[id] - Time to bid farewell to items that no longer serve us. 💥\n/android - Curious about what's behind the curtain? Let's uncover the mysteries together! 🤖", {}
    );
}
module.exports = helpCommand;
