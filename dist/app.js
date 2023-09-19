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
const telegraf_1 = require("telegraf");
const dotenv = __importStar(require("dotenv"));
const cron = __importStar(require("node-cron"));
dotenv.config();
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
let userJoinTimes = {};
cron.schedule('0 0 * * *', () => {
    userJoinTimes = {};
});
bot.on('new_chat_members', (ctx) => {
    const today = new Date().toDateString();
    const lastJoinedMember = ctx.message.new_chat_members[ctx.message.new_chat_members.length - 1];
    if (ctx.message.date && new Date(ctx.message.date * 1000).toDateString() === today) {
        userJoinTimes[lastJoinedMember.id] = ctx.message.date;
    }
});
bot.on('text', (ctx) => {
    const userId = ctx.from.id.toString();
    if (userJoinTimes[userId]) {
        const currentTime = Math.floor(Date.now() / 1000);
        const joinTime = userJoinTimes[userId];
        console.log(joinTime, currentTime, currentTime - joinTime);
        if (currentTime - joinTime < 300) {
            ctx.deleteMessage();
            ctx.reply(`Hi ${ctx.from.username}! New users are temporarily disabled from sending messages to prevent spam.`);
            return;
        }
    }
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=app.js.map