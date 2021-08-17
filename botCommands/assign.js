const http = require('http');
const { clearScreenDown } = require('readline');

//Role ID's from server 
const legendaryHero = "875723439367917599";
const epicHero = "875723598944403507"; 
const rareHero = "875723543650910239";
const hero = "876899073284775978";
const miamiHero = "877092107238653992"

module.exports =  function(message, args) { 

    if (args.length > 0) { 
        walletAdress = args.join(" ");
    }

    let options = { 
        host: `176.102.65.166`, 
        path: `/wallet/${walletAdress}`,
        port: '3000', 
        headers: {'token': 'klumpsy-token'}
    }

//Check for names in object and assign corresponding role to member 
    callback = function(response) { 
        let card = ''; 
            response.on('data',  function(chunk) { 
            card += chunk; 
        }); 

        response.on('end', () => { 
            checkCards = JSON.parse(card); 

            for (key in checkCards) {
                if (key === "dorian_nakamoto" ||
                    key === "nick_szabo" || 
                    key === "hal_fimney" 
                    && message.member.roles !== legendaryHero) { 
                        message.member.roles.set([legendaryHero]);
                        message.author.send("WAUW, you are legendary! *BEEP BEEP* :star_struck:")
                    return; 
                } 
                if (key === "snft_mirroring" || 
                    key === "interactive_conway's_game_of_life" || 
                    key === "launch_may_2021" || 
                    key === "honey_badger" || 
                    key === "crypto_dilemma" 
                    && message.member._roles !== hero) { 
                        message.member.roles.set([hero]);
                        message.author.send("Mmmmm you seem so special *BEEP BEEP* :grin:")
                    return; 
                }
                if (key === "miami_jack_dorsey" || 
                    key === "interactive_background" || 
                    key === "miami_charles_hoskinson" || 
                    key === "mongolian_bird_charles" || 
                    key === "mongolian_eagle_charles" || 
                    key === "miami_cathie_wood" 
                    && message.member.roles !== miamiHero) {
                        message.member.roles.set([miamiHero]);
                        message.author.send("Always warm, always sunny, sometimes a Miami hero. *BEEP BEEP* :sun_with_face:")
                    return;
                }
                if (key === "charles_hoskinson" || 
                    key === "gavin_wood" || 
                    key === "anatoly_yakovenko" || 
                    key === "beniamin_mincu" || 
                    key === "vitalik_buterin"
                    && message.member.roles !== epicHero) { 
                    message.member.roles.set([epicHero]);
                    message.author.send("Look at you being epic! *BEEP BEEP* :sunglasses:")
                    return; 
                } 
                if (key === "michael_saylor" || 
                    key === "jack_dorsey" ||
                    key === "elon_musk"|| 
                    key === "mike_novogratz" || 
                    key === "andreas_antonopoulos" ||
                    key === "cameron_winklevoss" ||
                    key === "jimmy_song" 
                    && message.member.roles !== rareHero) { 
                    message.member.roles.set([rareHero]);
                    message.author.send("You are truely a rare find! *BEEP BEEP* :face_with_monocle:")
                return;
                } 
                else { 
                    message.author.send("Are you sure that is a valid? BEEP BEEP :face_with_spiral_eyes:")  
                };
             };
         });
    };

    let req = http.request(options, callback); 
    req.end(); 
}; 
