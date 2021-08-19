module.exports = function(message, args) { 
    if(args.length > 0)
    {
        message.author.send("That doesn't seem valid... BEEP BEEP :face_with_spiral_eyes:");
    }
    else 
    { 
        message.reply("Hi there! Welcome to the Crypto Heroez Discord!");
    }
};
