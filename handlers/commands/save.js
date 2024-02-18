const { bot, User } = require('../../bot/index');

async function saveLinkCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageIdToSave = ctx.update.message.text.split("_")[2];

    try {
        // Procurar a mensagem no backup do usuário
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            const messageToSave = user.backupMessages.find(msg => msg.messageId === messageIdToSave);
            if (messageToSave) {
                // Salvar a mensagem no banco de dados
                let savedLink = { messageId: messageIdToSave, text: messageToSave.text };
                user.links.push(savedLink);
                await user.save();
                // Remover a mensagem do backup do usuário
                user.backupMessages.pull(messageToSave);
                await user.save();
                // Responder ao usuário que o link foi salvo com sucesso
                bot.telegram.sendMessage(chatId, "Link saved successfully.");
            } else {
                bot.telegram.sendMessage(chatId, "Oops! It looks like the message you're looking for couldn't be found in the backup");
            }
        } else {
            bot.telegram.sendMessage(chatId, "Oops! It seems that there was an issue saving the link.");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Apologies, but I encountered an issue while attempting to save the link. Please try again later.");
    }
}

async function saveTaleCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageIdToSave = ctx.update.message.text.split("_")[2];
 
    try {
        // Procurar a mensagem no backup do usuário
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            const messageToSave = user.backupMessages.find(msg => msg.messageId === messageIdToSave);
            if (messageToSave) {
                // Salvar a mensagem no banco de dados
                let savedTale = { messageId: messageIdToSave, text: messageToSave.text };
                user.tales.push(savedTale);
                await user.save();
                // Remover a mensagem do backup do usuário
                user.backupMessages.pull(messageToSave);
                await user.save();
                // Responder ao usuário que o conto foi salvo com sucesso
                bot.telegram.sendMessage(chatId, "Tale saved! Another story added to our collection. 📚🌟");
            } else {
                bot.telegram.sendMessage(chatId, "Ops! It looks like we can't save this story right now. 📚🌟");
            }
        } else {
            bot.telegram.sendMessage(chatId, "User? Where is the User?");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Failed to save the tale. Please give it another shot later.");
    }
}

async function saveListCommand(ctx) {
    const chatId = ctx.chat.id;
    const messageIdToSave = ctx.update.message.text.split("_")[2];

    try {
        // Procurar a mensagem no backup do usuário
        let user = await User.findOne({ id: chatId }).exec();
        if (user) {
            const messageToSave = user.backupMessages.find(msg => msg.messageId === messageIdToSave);
            if (messageToSave) {
                // Salvar a mensagem no banco de dados
                let savedList = { messageId: messageIdToSave, text: messageToSave.text };
                user.lists.push(savedList);
                await user.save();
                // Remover a mensagem do backup do usuário
                user.backupMessages.pull(messageToSave);
                await user.save();
                // Responder ao usuário que a lista foi salva com sucesso
                bot.telegram.sendMessage(chatId, "List saved successfully! 📋 Now we're talking! 🚀");
            } else {
                bot.telegram.sendMessage(chatId, "Message not found in the backup. Did it vanish into thin air? 🌪️");
            }
        } else {
            bot.telegram.sendMessage(chatId, "User not found. They must be playing hide and seek! 🕵️‍♂️");
        }
    } catch (err) {
        console.error(err);
        bot.telegram.sendMessage(chatId, "Failed to save the list. Oh, the gremlins are at it again! 🛠️ Please try again later.");
    }
}

module.exports = { saveLinkCommand, saveTaleCommand, saveListCommand };
