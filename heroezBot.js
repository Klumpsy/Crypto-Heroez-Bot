console.log('Beep Beep, Crypto Heroez Bot online');

require("dotenv").config(); 

const Discord = require("discord.js"); 
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents}); 

client.login(process.env.BOTTOKEN);

client.on('ready', () => { 
    console.log("Hello there");
});

const messageHandler = require("./messageHandler");

client.on('messageCreate', messageHandler); 