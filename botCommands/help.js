module.exports = function(message, args) { 
    message.channel.send(
        `Heya! Welcome to Crypto Heroez! These are my commands: 
        
        **!help:** Opens up this help panel
        **!hello:** Greet me :) 
        **!assign + wallet adress:** Get your role assigned
          according to your heroes rarity
          example: !assign 2342kl2342klj....
        **!verify + policy:** check if your token is the real deal!
          example: !verify 123456asdfdlkjsf....`     
    )
}
