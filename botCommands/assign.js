const http = require('http');
const { stringify } = require('querystring');
const { clearScreenDown } = require('readline');

//Array that contains rarity objects with messages, serverID and priority + error 
const cardRanking =
[ 
    {
    rank: "error",
    prio: 0,
    message: "That doesn't seem valid... BEEP BEEP :face_with_spiral_eyes:"
    },

    {
    rank: "rare",
    prio: 1,
    serverId:"875723543650910239",
    message: "You are truely a rare find! *BEEP BEEP* :face_with_monocle:"
    },

    {
    rank: "miami",
    prio: 2,
    serverId:"877092107238653992",
    message: "Always warm, always sunny, sometimes a Miami hero. *BEEP BEEP* :sun_with_face:"
    },

    {
    rank: "hero",
    prio: 3,
    serverId:"876899073284775978",
    message: "Mmmmm you seem so special *BEEP BEEP* :grin:"
    },

    {
    rank: "epic",
    prio: 4,
    serverId:"875723598944403507",
    message: "Look at you being epic! *BEEP BEEP* :sunglasses:"
    },

    {
    rank: "legendary",
    prio: 5,
    serverId:"875723439367917599",
    message: "WAUW, you are legendary! *BEEP BEEP* :star_struck:"
    },
]

module.exports =  function(message, args) 
{ 
    if (args.length > 0) { 
        walletAdress = args.join(" ");
    }

    let options = 
    { 
        host: `176.102.65.166`, 
        path: `/wallet/${walletAdress}`,
        port: '3000', 
        headers: {'token': 'klumpsy-token'}
    }

//Check for names in object and assign corresponding role to member 
    callback = function(response) 
    { 
        let card = ''; 
            response.on('data', function(chunk) 
            { 
            card += chunk; 
            });

//Store highest card in wallet in highestRank variable
        let highestRank = 0;
        
        function keepHighestRank(rank) 
        { 
            if (rank > highestRank) 
            { 
                highestRank = rank; 
            } else 
            {
              return;   
            }
        };

//Loop through cards in wallet and envoke keepHighestRank function
        response.on('end', () => 
        { 
        checkCards = JSON.parse(card); 

            for (const [{rarity}] of Object.entries(checkCards))   
            {   const rarities = Object.values(checkCards).map(({rarity}) => rarity); 
                for (let i = 0; i < rarities.length; i++) { 
                        if (rarities[i] === "legendary" ) 
                    {
                        keepHighestRank(5);                
                    }
                    else if (rarities[i] === "epic")
                    {     
                        keepHighestRank(4);  
                    } 
                    else if (rarities[i] === 'miami')
                    { 
                        keepHighestRank(3);   
                    } 
                    else if (rarities[i] === "hero")
                    {  
                        keepHighestRank(2);  
                    } 
                    else if (rarities[i] === "rare")    
                    {  
                        keepHighestRank(1);  
                    } 
                    else 
                    { 
                        message.author.send("OH OH.... You have no hero BEEP BEEP  :face_with_spiral_eyes:");
                    };
                };
            };   
                    if (highestRank === 0) 
                    { 
                        message.author.send(cardRanking[highestRank].message);
                    } 
                    else 
                    { 
                        message.member.roles.set([cardRanking[highestRank].serverId]);
                        message.author.send(cardRanking[highestRank].message);
                    }
                        
        });            
    };

    let req = http.request(options, callback); 
    req.end(); 
}; 

