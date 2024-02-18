require('dotenv').config();

const { Telegraf } = require('telegraf');
const { CohereClient } = require("cohere-ai");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const UserSchema = new mongoose.Schema({
    id: String,
    language: String,
    username: String,
    timer: Date,
    links: [{ messageId: String, text: String }], // Array of objects for links
    lists: [{ messageId: String, text: String }], // Array of objects for lists
    tales: [{ messageId: String, text: String }],  // Array of objects for tales
    backupMessages: [{ messageId: String, text: String }]
});

const User = mongoose.model("User", UserSchema, "users");

const cohere = new CohereClient({
    token: process.env.COHERE_TOKEN
});

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

module.exports = { bot, cohere, User };