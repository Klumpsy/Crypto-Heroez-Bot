const http = require('http');
const { clearScreenDown } = require('readline');

//Array that contains rarity objects with messages, serverID and priority + error 
const cardRanking =
[ 
    {
    rank_string: "error",
    rank: 0,
    message: "That doesn't seem valid... BEEP BEEP :face_with_spiral_eyes:"
    },

    {
    rank_string: "rare",
    rank: 1,
    serverId:"875723543650910239",
    message: "You are truely a rare find! *BEEP BEEP* :face_with_monocle:"
    },

    {
    rank_string: "hero",
    rank: 2,
    serverId:"876899073284775978",
    message: "Mmmmm you seem so special *BEEP BEEP* :grin:"
    },

    {
    rank_string: "miami",
    rank: 3,
    serverId:"877092107238653992",
    message: "Always warm, always sunny, sometimes a Miami hero. *BEEP BEEP* :sun_with_face:"
    },

    {
    rank_string: "epic",
    rank: 4,
    serverId:"875723598944403507",
    message: "Look at you being epic! *BEEP BEEP* :sunglasses:"
    },

    {
    rank_string: "legendary",
    rank: 5,
    serverId:"875723439367917599",
    message: "WAUW, you are legendary! *BEEP BEEP* :star_struck:"
    },
]

module.exports = async function(message, args) 
{ 
        let walletAdress = "";
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
    //Reset highest rank after role has been appointed 
            function resetWalletAndRank() 
            { 
            walletAdress = ("empty")
            highestRank = 0; 
            }
    
    //Store highest card in wallet in highestRank variable
            let highestRank = 0;
            
            function keepHighestRank(rank) 
            { 
                if (rank > highestRank) 
                { 
                    highestRank = rank; 
                }
            };
    
    //Loop through cards in wallet and envoke keepHighestRank function
            let checkCards = "";
            response.on('end', () => 
            { 
                if (card.length < 1)
                { 
                    card = {note:"error"};
                }
                try 
                { 
                    checkCards = JSON.parse(card);
                }
                catch(err)
                { 
                    message.author.send("OH OH.... That is not a valid adress  :face_with_spiral_eyes:");
                }
    
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
                            message.author.send("Use the !help command to check the botcommands :face_with_spiral_eyes:");
                        };
                    };
                };   
                        if (highestRank !== 0) 
                        { 
                            message.member.roles.set([cardRanking[highestRank].serverId]);
                        } 
                            message.author.send(cardRanking[highestRank].message);
                            resetWalletAndRank();                  
            });                            
        };
        try 
        {
            let req = http.request(options, callback); 
            req.end();
        }

        catch 
        { 
            message.author.send("BEEP BEEP, wrong adress or command... Use the !help command to check the botcommands :face_with_spiral_eyes:");
        }    
}; 


