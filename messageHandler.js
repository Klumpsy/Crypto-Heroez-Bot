//Import required files and modules
const helloBot = require("./botCommands/helloBot.js"); 
const verify = require("./botCommands/verify.js"); 
const assign = require("./botCommands/assign.js");

//bot message lookup object 
const botCommands = {helloBot, verify, assign};

//botmessage function for replying on userinput
module.exports = async function (message) { 
    let tokens = message.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === "!") { 
        command = command.substring(1); 
        botCommands[command](message, tokens); 
     };
};
    

