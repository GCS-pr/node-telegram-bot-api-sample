const data = require('./data.json')

module.exports = (bot) => {
  bot.onText(/(baza|gcs)/, function(msg) {
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'ГКС', callback_data: 'gcs' }],
          [{ text: 'Триафлай', callback_data: 'triafly' }],
          [{ text: 'ДС', callback_data: 'ds' }]
        ]
      })
    };
    bot.sendMessage(msg.chat.id, "Добрый день, выберите файлы которые вас интересуют.", options);
  })
  
  // Handle callback queries
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const userOpts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    let text = 'Sorry, in progress...';
    let options
    switch(action) {
      case 'gcs':
        text = 'Какие файлы вас интересуют?';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Презентации', callback_data: 'gcs.pres' }],
              [{ text: 'Логотипы', callback_data: 'gcs.logo' }],
              [{ text: 'Маркетинговые материалы', callback_data: 'gcs.marketing' }],
              [{ text: 'Видеоролики', callback_data: 'gcs.video' }]
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.logo':
        text = 'В каком формате интересуют логотипы?';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'PNG', callback_data: 'gcs.logo.png' }],
              [{ text: 'JPG', callback_data: 'gcs.logo.jpg' }]
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.logo.png':
        text = data.gcs.logo.png.join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}