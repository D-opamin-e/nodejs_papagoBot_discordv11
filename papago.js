const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');

const client_id = 'API_ID';
const client_secret = 'API-PW';

client.on('ready', () => {

  console.log(`papago workup!` + new Date());
  client.user.setActivity('?kr / ?jp');
});

client.on('message', message => {
  if (message.author.bot) return; // 봇의 메시지는 무시한다.

  if (message.content.startsWith('?jp ')) { // "?jp 번역할내용"으로 시작하는 메시지를 처리한다.
    const text = message.content.substring(4); // "?jp " 부분을 제외한 나머지 부분을 추출한다.
    const source = 'ko'; // 번역할 언어
    const target = 'ja'; // 번역될 언어
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';

    const options = {
      url: api_url,
      form: { source, target, text },
      headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body).message.result;
        message.channel.send({
          embed: {
            thumbnail: {
              url: "https://papago.naver.com/static/img/papago_og.png"
            },
            title: "[ 한국어 -> 日本語 ]",
            description: `**한국어**\n${text}\n**日本語**\n${result.translatedText}`,
            color: 0xFF0000,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        });
        
      } else {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        message.channel.send('번역에 실패했습니다.');
      }
    });
  } else if (message.content.startsWith('?kr ')) { // "?kr 번역할내용"으로 시작하는 메시지를 처리한다.
    const text = message.content.substring(4); // "?kr " 부분을 제외한 나머지 부분을 추출한다.
    const source = 'ja'; // 번역할 언어
    const target = 'ko'; // 번역될 언어
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';

    const options = {
      url: api_url,
      form: { source, target, text },
      headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body).message.result;
        message.channel.send({
          embed: {
            thumbnail: {
              url: "https://papago.naver.com/static/img/papago_og.png"
            },
            title: "[ 日本語 -> 한국어 ]",
            description: `**日本語**\n${result.translatedText}\n**한국어**\n${text}`,
            color: 0x0000FF,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        });
      } else {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        message.channel.send('翻訳に失敗しました。');
      }
    });
  }
});

client.login('DISCORD_TOKEN');
