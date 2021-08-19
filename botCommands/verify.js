//remove first userinput (which will be the command) and join the remaining elements (search input)
const fetch = require("node-fetch");

module.exports = async function(message, args) 
{       
    let policyId = "";
        if (args.length > 0) 
        { 
           policyId = args.join(" ");
        };
        if(policyId === undefined) 
        {
           policyId = "error"
        }
 //Crypto Heroez API checking if token is real
    const heroezApi = `https://cryptoheroez.io/api/policy/${policyId}`; 
    try 
    { 
        let response = await fetch(heroezApi); 
        let json = await response.json();
        if(json.valid) 
        { 
            message.channel.send(`Name: ${json.title}, your Crypto hero is the real deal!`);
        } 
        else 
        { 
            message.channel.send("BEEP BEEP !!!NOT A REAL HERO!!! BEEP BEEP");
        }  
    }
    catch 
    {  
     message.author.send("Are you sure that is a valid? BEEP BEEP :face_with_spiral_eyes:")    
    };
    policyId = ""; //remove policy ID so !verify won't return a value;
};