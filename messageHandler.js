
//Import required files and modules
const hello = require("./botCommands/helloBot.js"); 
const verify = require("./botCommands/verify.js"); 
const assign = require("./botCommands/assign.js");
const help = require("./botCommands/help.js");

//bot message lookup object 
const botCommands = {hello, verify, assign, help};

//botmessage function for replying on userinput
module.exports = async function (message) 
{ 
    let tokens = message.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === "!") 
    { 
        command = command.substring(1);
        if(command === "hello" || 
           command === "verify"||
           command === "assign"||
           command === "help")
           { 
            botCommands[command](message, tokens); 
           }
           else 
           { 
            message.author.send("OH OH.... That is not a valid command, see !help for valid commands  :face_with_spiral_eyes:");
           }   
     };
};
    
