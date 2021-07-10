const TelegramBot = require('node-telegram-bot-api')
const path = require('path')
// const axios = require('axios')

require('dotenv').config({ path: path.join(__dirname, './.prod.env') })

// CONTRAGENTS:
const gksLogic = require('./contragents/gcs/logic')
// Others...

// replace the value below with the Telegram token you receive from @BotFather
const {
  TG_BOT_TOKEN,
  DEVELOPER_NAME,
  DEVELOPER_CHAT_ID,
} = process.env

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true })

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  console.log(msg)
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp)
})

// Matches "/wtf [whatever]"
bot.onText(/\/wtf (.+)/, async function (msg, match) {
  const senderChatId = msg.chat.id
  const msg = match[1] // the captured "whatever"

  // const res = await axios.get(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?text=${msg}&chat_id=${DEVELOPER_CHAT_ID}`)

  bot.sendMessage(DEVELOPER_CHAT_ID, `BOT MSG: From ${senderChatId}` + '\n' + msg)
  bot.sendMessage(senderChatId, `Ok, your msg sent to ${DEVELOPER_NAME}`)
})

gksLogic(bot)

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  const chatId = msg.chat.id

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message")
})
