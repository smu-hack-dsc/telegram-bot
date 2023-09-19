"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const telegraf_1 = require("telegraf");
const cron = __importStar(require("node-cron"));
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
let joinedToday = {};
cron.schedule('0 0 * * *', () => {
    joinedToday = {};
});
bot.on('new_chat_members', (ctx) => {
    const today = new Date().toDateString();
    const lastJoinedMember = ctx.message.new_chat_members[ctx.message.new_chat_members.length - 1];
    if (ctx.message.date && new Date(ctx.message.date * 1000).toDateString() === today) {
        joinedToday[lastJoinedMember.id] = true;
    }
});
bot.on('text', (ctx) => {
    const userId = ctx.from.id.toString();
    console.log(joinedToday);
    console.log(userId);
    if (joinedToday[userId]) {
        ctx.deleteMessage();
        ctx.reply(`Hi ${ctx.from.username}! To prevent bot spam, we have new users from sending messages temporarily.`);
        return;
    }
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map