import { Context, Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';

dotenv.config();
const bot: Telegraf<Context> = new Telegraf(process.env.BOT_TOKEN as string);

let userJoinTimes: Record<string, number> = {};

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
    
    console.log(joinTime, currentTime, currentTime - joinTime)
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
