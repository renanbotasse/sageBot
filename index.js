require("dotenv").config();
const { webhookCallback } = require("grammy");

const express = require("express");
const expressApp = express();
const { bot } = require('./bot/index');

const randomCommand = require("./handlers/commands/random");
const searchCommand = require("./handlers/commands/search");
const sageCommand = require("./handlers/commands/sage");
const taleCommand = require("./handlers/commands/tale");
const helpCommand = require("./handlers/commands/help");
const androidCommand = require("./handlers/commands/android");
const startCommand = require("./handlers/commands/start");
const { languageCommand, handleLanguageCallback } = require('./handlers/commands/language');
const { saveLinkCommand, saveTaleCommand, saveListCommand } = require('./handlers/commands/save');
const { savedLinkCommand, savedTaleCommand, savedListCommand } = require('./handlers/commands/saved');
const deleteCommand = require("./handlers/commands/delete");
const unmatchedCommand = require("./handlers/commands/unmatched");

expressApp.use(express.static("static"));
expressApp.use(express.json());

//wikipedia
bot.command('random', randomCommand);
bot.command('search', searchCommand);
//cohere
bot.command('sage', sageCommand);
bot.command('tale', taleCommand);
//system
bot.command("help", helpCommand);
bot.command('android', androidCommand);
//db
bot.command("start", startCommand);
bot.command('language', languageCommand);
bot.on('callback_query', handleLanguageCallback);
bot.command(/save_link_\d+/, saveLinkCommand);
bot.command(/save_list_\d+/, saveListCommand);
bot.command(/save_tale_\d+/, saveTaleCommand);

bot.command("saved_link", savedLinkCommand);
bot.command("saved_list", savedListCommand);
bot.command("saved_tale", savedTaleCommand);

bot.command(/delete_\d+/, deleteCommand);

bot.on('message', async (ctx) => {
    await unmatchedCommand(ctx);
});

if (process.env.NODE_ENV === "production") {
    // Use Webhooks for the production server
    app.use(express.json());
    app.use(webhookCallback(bot, "express"));  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`);
    });
} else {
    // Use Long Polling for development
    bot.launch();
}
