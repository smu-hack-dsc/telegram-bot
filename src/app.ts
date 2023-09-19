import { Context, Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';

dotenv.config();
const bot: Telegraf<Context> = new Telegraf(process.env.BOT_TOKEN as string);

let joinedToday: Record<string, boolean> = {};

cron.schedule('0 0 * * *', () => {
  joinedToday = {}
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
  console.log(joinedToday)
  console.log(userId)

  if (joinedToday[userId]) {
    ctx.deleteMessage();
    ctx.reply(`Hi ${ctx.from.username}! To prevent bot spam, we have restricted new users from sending messages temporarily.`);
    return;
  }
});

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
